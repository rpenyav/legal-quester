import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Event {
  @Prop({ required: true })
  eventId: string;

  @Prop({ required: true, unique: true })
  slugEvent: string;

  @Prop({ required: true })
  titleEvent: string;

  @Prop({ default: true })
  publishedEvent: boolean;

  @Prop({ default: Date.now })
  dateEvent: Date;

  @Prop({ type: [String] })
  imagesEvent: string[];

  @Prop({ type: [String] })
  tagsEvent: string[];

  @Prop({ required: true })
  sourceEvent: string;

  @Prop({ required: true })
  publishedBy: string;

  @Prop({ required: true })
  contentEvent: string;

  @Prop({ required: true })
  urlEvent: string;
}

export type EventDocument = Event & Document;
export const EventSchema = SchemaFactory.createForClass(Event);
