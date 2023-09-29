import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThemesController } from './themes.controller';
import { ThemesService } from './themes.service';
import { ThemeSchema } from './model/themes.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'Theme', schema: ThemeSchema }]),
  ],
  controllers: [ThemesController],
  providers: [ThemesService],
})
export class ThemesModule {}
