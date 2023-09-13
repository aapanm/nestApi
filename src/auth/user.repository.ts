import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';

export interface SignUpResponse {
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

  async signUp(authCredentialDto: AuthCredentialDto): Promise<SignUpResponse> {
    let response: SignUpResponse;

    try {
      const { username, password } = authCredentialDto;
      const user = new User();
      user.username = username;
      user.password = password;
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
}
