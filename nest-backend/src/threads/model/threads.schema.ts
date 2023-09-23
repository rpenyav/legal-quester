import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Thread {
  @Prop({ type: [String] })
  threadTemathic: string[];

  @Prop({ required: true })
  owner: string; // Supongo que es el ID del usuario

  @Prop({ default: Date.now })
  publishDate: Date;

  @Prop()
  description: string;

  @Prop()
  isAdultContent: boolean;

  @Prop()
  isBook: boolean;

  @Prop()
  isVynifa: boolean;

  @Prop()
  isGame: boolean;

  @Prop()
  isComic: boolean;

  @Prop()
  isOther: boolean;

  @Prop()
  bookTitle: string;

  @Prop()
  bookAuthor: string;

  @Prop()
  bookISBN: string;

  @Prop()
  bookEditorial: string;

  @Prop()
  bookNumberEdition: string;

  @Prop()
  bookYearEdition: string;

  @Prop()
  bookDescription: string;

  @Prop({ type: [String] })
  bookImages: string[];

  @Prop()
  vynilTitle: string;

  @Prop()
  vynilArtist: string;

  @Prop()
  vynilDiscography: string;

  @Prop()
  vynilYearEdition: string;

  @Prop()
  vynilDescription: string;

  @Prop({ type: [String] })
  vynilImages: string[];

  @Prop()
  gameTitle: string;

  @Prop()
  gameCategory: string;

  @Prop()
  gamePegy: string;

  @Prop()
  gameDistribuitor: string;

  @Prop()
  gameYearEdition: string;

  @Prop()
  gameDescription: string;

  @Prop({ type: [String] })
  gameImages: string[];

  @Prop()
  comicTitle: string;

  @Prop()
  comicAuthor: string;

  @Prop()
  comicISBN: string;

  @Prop()
  comicEditorial: string;

  @Prop()
  comicNumberEdition: string;

  @Prop()
  comicYearEdition: string;

  @Prop()
  comicDescription: string;

  @Prop({ type: [String] })
  comicImages: string[];

  @Prop()
  otherTitle: string;

  @Prop()
  otherAuthor: string;

  @Prop()
  otherISBN: string;

  @Prop()
  otherEditorial: string;

  @Prop()
  otherNumberEdition: string;

  @Prop()
  otherYearEdition: string;

  @Prop()
  otherDescription: string;

  @Prop({ type: [String] })
  otherImages: string[];

  @Prop()
  otherArtist: string;

  @Prop()
  otherDiscography: string;

  @Prop()
  otherCategory: string;

  @Prop()
  otherPegy: string;

  @Prop()
  otherDistribuitor: string;

  @Prop()
  ownerResponsaCopy: string;

  @Prop()
  qualityStatus: string;

  @Prop()
  content: string;

  @Prop({ type: [{ score: Number, date: Date }] })
  qualification: { score: number; date: Date }[];

  @Prop({ type: [Types.ObjectId] })
  comments: Types.ObjectId[];
}

export type ThreadDocument = Thread & Document;
export const ThreadSchema = SchemaFactory.createForClass(Thread);
