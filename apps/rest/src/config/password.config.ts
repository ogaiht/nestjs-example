import { HashConfig } from '../password';

export const passwordConfig: HashConfig = {
  passwordLength: 128,
  saltLength: 32,
  iterations: 1000,
  digets: 'sha256',
  encoding: 'base64'
};
