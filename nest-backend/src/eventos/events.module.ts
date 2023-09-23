import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventSchema } from './model/events.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
