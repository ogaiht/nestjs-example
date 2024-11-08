import { AuthenticationResultStatus } from './authentication-result-status';

export interface AuthenticationResult {
  status: AuthenticationResultStatus;
  accessToken?: string;
  refreshToken?: string;
}

export interface RefreshTokenResult {
  success: boolean;
  accessToken?: string;
}
