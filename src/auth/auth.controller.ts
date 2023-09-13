import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { SignUpResponse } from './user.repository';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe)
    authCredentialDto: AuthCredentialDto,
    @Res() res: Response,
  ) {
    const response: SignUpResponse =
      await this.authService.signUp(authCredentialDto);
    if (response.success) {
      res.status(HttpStatus.CREATED).json(response);
    } else {
      res.status(HttpStatus.BAD_REQUEST).json(response);
    }
  }
}
