export interface UserInfo {
  id: string;
  displayName: string;
  userPrincipalName: string;
  mail?: string;
  jobTitle?: string;
  department?: string;
  mfaEnabled: boolean;
  mfaMethods?: string[];
  isAdmin: boolean;
  adminRoles?: string[];
  accountEnabled: boolean;
  lastSignIn?: string;
  createdDateTime?: string;
}

export interface UsersResponse {
  value: UserInfo[];
  totalCount: number;
  mfaEnabledCount: number;
  mfaDisabledCount: number;
  adminCount: number;
  globalAdminCount: number;
}

export interface DirectoryRole {
  id: string;
  displayName: string;
  description: string;
  members: {
    id: string;
    displayName: string;
    userPrincipalName: string;
  }[];
}
