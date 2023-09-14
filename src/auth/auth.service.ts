import { Injectable } from '@nestjs/common';
import { AuthResponse, UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt/dist';
@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<AuthResponse> {
    const response: AuthResponse =
      await this.userRepository.signUp(authCredentialDto);
    return response;
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<AuthResponse> {
    const response: AuthResponse =
      await this.userRepository.signIn(authCredentialDto);

    if (response.success) {
      const payload = { username: response.username };
      const accessToken = await this.jwtService.sign(payload);
      response.accessToken = accessToken;
    }

    return response;
  }
}
