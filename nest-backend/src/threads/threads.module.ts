import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Thread, ThreadSchema } from './model/threads.schema';
import { ThreadsController } from './threads.controller';
import { ThreadsService } from './threads.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'Thread', schema: ThreadSchema }]),
  ],
  controllers: [ThreadsController],
  providers: [ThreadsService],
})
export class ThreadsModule {}
