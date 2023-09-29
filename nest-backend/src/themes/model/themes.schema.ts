import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Theme {
  @Prop({ unique: true })
  theme: string;

  @Prop()
  nameThemeEN: string;

  @Prop()
  nameThemeES: string;
}

export type ThemeDocument = Theme & Document;
export const ThemeSchema = SchemaFactory.createForClass(Theme);
