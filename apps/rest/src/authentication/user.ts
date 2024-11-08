export interface User {
  username: string;
  claims: Claim[];
}

export interface Claim {
  name: string;
  value: string | string[];
}

export interface UserRefresh {
  sub: string;
}
