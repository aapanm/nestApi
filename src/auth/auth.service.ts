import { Injectable } from '@nestjs/common';
import { AuthResponse, UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<AuthResponse> {
    const response: AuthResponse =
      await this.userRepository.signUp(authCredentialDto);
    return response;
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<AuthResponse> {
    const response: AuthResponse =
      await this.userRepository.signIn(authCredentialDto);
    return response;
  }
}
