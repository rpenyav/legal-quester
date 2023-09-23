import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';
import { PassportModule } from '@nestjs/passport';
import { ProyectoModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.production' }), // Movido arriba
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    UserModule,
    ProyectoModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log('Secret Key:', configService.get<string>('SECRET_KEY'));
        return {
          secret: configService.get<string>('SECRET_KEY'),
          signOptions: { expiresIn: '1h' },
        };
      },
      inject: [ConfigService],
    }),

    MongooseModule.forRootAsync({
      // Este sigue después de ConfigModule
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),

    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
