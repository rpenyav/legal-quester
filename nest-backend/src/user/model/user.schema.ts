// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Proyecto } from 'src/project/model/project.schema';

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  telephone: string;

  @Prop()
  avatar: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  profileImage?: string;

  @Prop()
  lastLogin?: Date;

  @Prop({ default: false })
  isVerified?: boolean;

  @Prop([String])
  notifications?: string[];

  // Campos para usuarios empresa
  @Prop()
  companyName?: string;

  @Prop()
  nameCompanyRep: string;

  @Prop()
  surnameCompanyRep: string;

  @Prop()
  industryType?: string;

  @Prop()
  companySize?: string;

  @Prop()
  companyWebsite?: string;

  @Prop([String])
  socialLinks?: string[];

  @Prop()
  location?: string;

  @Prop()
  companyDescription?: string;

  @Prop([String])
  openRoles?: string[];

  // Campos para usuarios candidato
  @Prop()
  jobTitle?: string;

  @Prop()
  educationLevel?: string;

  @Prop([String])
  languages?: string[];

  @Prop([String])
  certifications?: string[];

  @Prop()
  portfolioUrl?: string;

  @Prop()
  resumeUrl?: string;

  @Prop()
  availability?: string;

  // Campos compartidos
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Proyecto' }] })
  projects: Types.Array<Proyecto>;

  @Prop({ default: Date.now })
  signupDate: Date;

  @Prop({ default: false, required: true })
  isCompany: boolean;

  @Prop()
  curriculum: string;

  @Prop([String])
  skills: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Proyecto' }] })
  previousProjects?: Types.Array<Proyecto>;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Proyecto' }] })
  appliedProjects: Types.Array<Proyecto>;

  @Prop({
    type: [
      {
        idEnemy: { type: Types.ObjectId, required: true },
        addedOn: { type: Date, required: true, default: Date.now },
      },
    ],
  })
  peopleBlocked: {
    idEnemy: Types.ObjectId;
    addedOn: Date;
  }[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
