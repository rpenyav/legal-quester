import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionnaireDocument = Questionnaire & Document;

@Schema()
export class Questionnaire {
  @Prop()
  projectId: string; // The ID of the project linked to the Questionnaire

  @Prop()
  title: string; // Title of the Questionnaire

  @Prop([
    {
      question: { type: String },
      type: { type: String, enum: ['multipleChoice', 'text'] }, // 'multipleChoice' for multiple options and 'text' for textual answer
      options: [{ type: String }], // Options for 'multipleChoice' type
    },
  ])
  questions: Question[]; // Array of questions

  @Prop()
  createdAt: Date; // Date of creation

  @Prop()
  updatedAt: Date; // Date of last update
}

export class Question {
  question: string;
  type: 'multipleChoice' | 'text';
  options?: string[]; // This field is optional and only used when the type is 'multipleChoice'
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
