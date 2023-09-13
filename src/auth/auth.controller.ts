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
import { AuthResponse } from './user.repository';
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
    const response: AuthResponse =
      await this.authService.signUp(authCredentialDto);
    if (response.success) {
      res.status(HttpStatus.CREATED).json(response);
    } else {
      res.status(HttpStatus.BAD_REQUEST).json(response);
    }
  }

  @Post('/signIn')
  async signIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
    @Res() res: Response,
  ) {
    const response: AuthResponse =
      await this.authService.signIn(authCredentialDto);

    if (response.success) {
      res.status(HttpStatus.FOUND).json(response);
    } else {
      if (response.message == 'password not matched!') {
        res.status(HttpStatus.BAD_REQUEST).json(response);
      } else if (response.message == 'user not found!') {
        res.status(HttpStatus.NOT_FOUND).json(response);
      } else {
        res.status(HttpStatus.BAD_REQUEST).json(response);
      }
    }
  }
}
