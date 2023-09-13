import { Injectable } from '@nestjs/common';
import { SignUpResponse, UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<SignUpResponse> {
    const response: SignUpResponse =
      await this.userRepository.signUp(authCredentialDto);
    return response;
  }
}
