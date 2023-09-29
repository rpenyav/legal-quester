import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtModule } from '@nestjs/jwt';
import { QuestionnaireSchema } from './model/questionnaire.schema';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'Questionnaire', schema: QuestionnaireSchema },
    ]),
  ],
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService],
})
export class QuestionnaireModule {}
