import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Proposal {
  @Prop({ required: true })
  owner: string;

  @Prop({ required: true })
  articleInterested: string;

  @Prop({ required: true })
  myOfferArticle: string;

  @Prop({ required: true })
  user: string;

  @Prop({ default: Date.now })
  proposalDate: Date;

  @Prop()
  expireDate: Date;

  @Prop({ unique: true })
  proposalReference: string;
}

export type ProposalDocument = Proposal & Document;
export const ProposalSchema = SchemaFactory.createForClass(Proposal);
