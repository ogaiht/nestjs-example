import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { PasswordHash } from './password-hash';
import { passwordConfig } from '../config';

@Injectable()
export class PasswordService {
  generateHash(password: string): Promise<PasswordHash> {
    return new Promise<PasswordHash>((resolve, reject) => {
      const salt = crypto
        .randomBytes(passwordConfig.saltLength)
        .toString(passwordConfig.encoding);
      crypto.pbkdf2(
        password,
        salt,
        passwordConfig.iterations,
        passwordConfig.passwordLength,
        passwordConfig.digets,
        (error, hash) => {
          if (error) {
            reject(error);
          }
          resolve({
            hash: hash.toString(passwordConfig.encoding),
            salt,
            iterations: passwordConfig.iterations
          });
        }
      );
    });
  }

  verifyPassword(
    passwordHash: PasswordHash,
    password: string
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      crypto.pbkdf2(
        password,
        passwordHash.salt,
        passwordHash.iterations,
        passwordConfig.passwordLength,
        passwordConfig.digets,
        (error, hash) => {
          if (error) {
            reject(error);
          }
          resolve(passwordHash.hash === hash.toString(passwordConfig.encoding));
        }
      );
    });
  }
}
