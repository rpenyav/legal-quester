// proyecto.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/model/user.schema';

@Schema()
export class Proyecto {
  @Prop({ unique: true })
  id: string;

  @Prop()
  nombre: string;

  @Prop()
  descripcion: string;

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
  areaLegal: string;

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
  cliente?: string;

  @Prop()
  resultadosEsperados?: string;

  @Prop([String])
  etapasProyecto?: string[];

  @Prop()
  jurisdiccion?: string;

  @Prop([String])
  requisitosLegales?: string[];
}

export type ProyectoDocument = Proyecto & Document;
export const ProyectoSchema = SchemaFactory.createForClass(Proyecto);
