import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  handleRequest(err: any, user: any, info: any) {
    this.logger.debug(`Error: ${JSON.stringify(err)}`);
    this.logger.debug(`User: ${JSON.stringify(user)}`);
    this.logger.debug(`Info: ${JSON.stringify(info)}`);

    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          'No se proporcionó el token o es inválido. Por favor, incluye un token válido en la cabecera.',
        )
      );
    }
    return user;
  }
}
