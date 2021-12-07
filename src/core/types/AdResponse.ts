import { IdTokenClaims } from "./IdTokenClaims";

export interface AdResponse {
    homeAccountId: string;
    environment: string;
    tenantId: string;
    username: string;
    localAccountId: string;
    name: string;
    idTokenClaims: IdTokenClaims;
}
