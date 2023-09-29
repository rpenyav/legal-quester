import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Preferences {
  @Prop([{ type: String }])
  typeOfProjects: string[];

  @Prop([{ type: String }])
  cityOfProjects: string[];

  @Prop([{ type: String }])
  areaLegalProjects: string[];
}

export const PreferencesSchema = SchemaFactory.createForClass(Preferences);
