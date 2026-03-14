import type { Client } from "@microsoft/microsoft-graph-client";
import type { UsersResponse } from "@/types/users";

export async function fetchUsers(client: Client): Promise<UsersResponse> {
  // 1. Fetch all users
  const usersResponse = await client
    .api("/users")
    .top(999)
    .select("id,displayName,userPrincipalName,mail,jobTitle,department,accountEnabled,createdDateTime,signInActivity")
    .get();

  // 2. Fetch directory roles with members
  const rolesResponse = await client
    .api("/directoryRoles")
    .expand("members")
    .get();

  // 3. Fetch real MFA registration status from Graph API
  //    Requires AuditLog.Read.All + Directory.Read.All (already configured)
  let mfaMap = new Map<string, { isMfaRegistered: boolean; methodsRegistered: string[] }>();
  try {
    const mfaResponse = await client
      .api("/reports/authenticationMethods/userRegistrationDetails")
      .top(999)
      .get();

    for (const entry of mfaResponse.value || []) {
      mfaMap.set(entry.id, {
        isMfaRegistered: entry.isMfaRegistered ?? false,
        methodsRegistered: entry.methodsRegistered || [],
      });
    }
    console.log(`[Graph:Users] MFA data loaded for ${mfaMap.size} users`);
  } catch (mfaError) {
    console.warn("[Graph:Users] Could not fetch MFA registration details, falling back to per-user check:", (mfaError as Error).message);
    // Fallback: try per-user authentication methods (slower but works with fewer permissions)
    for (const user of usersResponse.value || []) {
      try {
        const methods = await client
          .api(`/users/${user.id}/authentication/methods`)
          .get();
        // A user has MFA if they have more than just password (method type #Microsoft.Graph.passwordAuthenticationMethod)
        const nonPasswordMethods = (methods.value || []).filter(
          (m: Record<string, string>) => m["@odata.type"] !== "#microsoft.graph.passwordAuthenticationMethod"
        );
        mfaMap.set(user.id, {
          isMfaRegistered: nonPasswordMethods.length > 0,
          methodsRegistered: nonPasswordMethods.map((m: Record<string, string>) =>
            (m["@odata.type"] || "").replace("#microsoft.graph.", "").replace("AuthenticationMethod", "")
          ),
        });
      } catch {
        // If we can't read this user's methods, mark as unknown (disabled)
        mfaMap.set(user.id, { isMfaRegistered: false, methodsRegistered: [] });
      }
    }
  }

  // Build admin roles map
  const adminRolesMap = new Map<string, string[]>();
  let globalAdminCount = 0;

  for (const role of rolesResponse.value || []) {
    for (const member of role.members || []) {
      const existing = adminRolesMap.get(member.id) || [];
      existing.push(role.displayName);
      adminRolesMap.set(member.id, existing);
      if (role.displayName === "Global Administrator") {
        globalAdminCount++;
      }
    }
  }

  // Combine all data
  let mfaEnabledCount = 0;
  let mfaDisabledCount = 0;

  const users = (usersResponse.value || []).map((user: Record<string, unknown>) => {
    const roles = adminRolesMap.get(user.id as string) || [];
    const mfaInfo = mfaMap.get(user.id as string);
    const mfaEnabled = mfaInfo?.isMfaRegistered ?? false;
    const mfaMethods = mfaInfo?.methodsRegistered || [];

    if (mfaEnabled) mfaEnabledCount++;
    else mfaDisabledCount++;

    return {
      id: user.id,
      displayName: user.displayName,
      userPrincipalName: user.userPrincipalName,
      mail: user.mail,
      jobTitle: user.jobTitle,
      department: user.department,
      mfaEnabled,
      mfaMethods,
      isAdmin: roles.length > 0,
      adminRoles: roles,
      accountEnabled: user.accountEnabled,
      lastSignIn: (user.signInActivity as Record<string, string>)?.lastSignInDateTime,
      createdDateTime: user.createdDateTime,
    };
  });

  return {
    value: users,
    totalCount: users.length,
    mfaEnabledCount,
    mfaDisabledCount,
    adminCount: adminRolesMap.size,
    globalAdminCount,
  };
}
