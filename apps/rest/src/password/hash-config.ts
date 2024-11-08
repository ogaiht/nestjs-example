export interface HashConfig {
  passwordLength: number;
  saltLength: number;
  iterations: number;
  digets: 'sha256';
  encoding: 'base64' | 'hex';
}
