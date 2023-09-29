// proyecto.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/model/user.schema';

@Schema()
export class Proyecto {
  @Prop()
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop()
  fechaPublicacion: Date;

  @Prop()
  fechaInicio: Date;

  @Prop()
  fechaFin?: Date;

  @Prop([String])
  habilidadesRequeridas: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  candidatosAplicantes?: Types.Array<User>;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  candidatoSeleccionado?: User;

  // Campos nuevos

  @Prop()
  estatus: string;

  @Prop()
  prioridad: string;

  @Prop([String])
  documentosAdjuntos?: string[];

  @Prop({ type: Number })
  tarifa: number;

  @Prop()
  modalidadPago?: string;

  @Prop()
  owner?: string;

  @Prop()
  cliente?: string;

  @Prop()
  resultadosEsperados?: string;

  @Prop([String])
  etapasProyecto?: string[];

  @Prop()
  cityOfProject?: string[];

  @Prop()
  typeOfCase?: string[];

  @Prop()
  areaLegal: string;
  @Prop()
  jurisdiccion?: string;

  @Prop()
  surveyNumber?: string;

  @Prop([String])
  requisitosLegales?: string[];
}

export type ProyectoDocument = Proyecto & Document;
export const ProyectoSchema = SchemaFactory.createForClass(Proyecto);
