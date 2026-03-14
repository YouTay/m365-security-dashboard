import { Client } from "@microsoft/microsoft-graph-client";
import type { AccountInfo, IPublicClientApplication } from "@azure/msal-browser";
import { graphScopes } from "@/lib/msal/scopes";

export function createGraphClient(
  msalInstance: IPublicClientApplication,
  account: AccountInfo
): Client {
  return Client.init({
    authProvider: async (done) => {
      try {
        const response = await msalInstance.acquireTokenSilent({
          scopes: graphScopes,
          account,
        });
        done(null, response.accessToken);
      } catch (error) {
        done(error as Error, null);
      }
    },
  });
}
