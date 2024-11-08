export interface PasswordHash {
  hash: string;
  salt: string;
  iterations: number;
}
