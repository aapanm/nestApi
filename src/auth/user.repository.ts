import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';

export interface AuthResponse {
  success: boolean;
  id?: number;
  username?: string;
  message: string;
}

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signUp(authCredentialDto: AuthCredentialDto): Promise<AuthResponse> {
    let response: AuthResponse;

    try {
      const { username, password } = authCredentialDto;
      const user = new User();
      user.username = username;
      const { hashedPass, salt } = await this.hashPassword(password);
      user.password = hashedPass;
      user.salt = salt;
      console.log(user);
      await user.save();

      response = {
        success: true,
        id: user.id,
        username: user.username,
        message: 'user created successfully',
      };

      return response;
    } catch (e) {
      response = {
        success: false,
        message: `something went wrong while creating user, ${e}`,
      };

      return response;
    }
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<AuthResponse> {
    let response;

    try {
      const { username, password } = authCredentialDto;
      const user = await this.findOne({ where: { username } });

      if (user) {
        if (await this.validPassword(password, user.password, user.salt)) {
          response = {
            success: true,
            id: user.id,
            username,
            message: 'user found!',
          };
        } else {
          response = {
            success: false,
            message: 'password not matched!',
          };
        }
      } else {
        response = {
          success: false,
          message: 'user not found!',
        };
      }
    } catch (e) {
      response = {
        success: false,
        message: `something went wrong while finding user, ${e}`,
      };
    }

    return response;
  }

  private async validPassword(
    password: string,
    hashedPassword: string,
    salt: string,
  ): Promise<boolean> {
    const hash = await bcrypt.hash(password, salt);
    return hash === hashedPassword;
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);
    return { hashedPass, salt };
  }
}
