import { Injectable, Logger } from '@nestjs/common'; // Asegúrate de importar Logger
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name); // Crea una instancia del logger

  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_KEY'), // Use ConfigService to get the SECRET_KEY
    });
  }

  async validate(payload: any) {
    this.logger.debug(`Payload del JWT: ${JSON.stringify(payload)}`); // Loggea el payload del JWT

    // También puedes loggear el valor de la clave secreta (para propósitos de diagnóstico solamente, deberías removerlo luego por seguridad)
    this.logger.debug(
      `Valor del SECRET_KEY: ${this.configService.get<string>('SECRET_KEY')}`,
    );

    return { userId: payload._id, email: payload.email };
  }
}
