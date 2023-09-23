import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';
import { ProyectoSchema } from './model/project.schema';
import { ProyectosService } from './projects.service';
import { ProyectoController } from './projects.controller';

@Module({
  imports: [
    CloudinaryModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    MongooseModule.forFeature([{ name: 'Proyecto', schema: ProyectoSchema }]),
  ],
  controllers: [ProyectoController],
  providers: [ProyectosService, CloudinaryService],
})
export class ProyectoModule {}
