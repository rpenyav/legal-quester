import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proyecto, ProyectoDocument } from './model/project.schema';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectModel(Proyecto.name) private proyectoModel: Model<ProyectoDocument>,
  ) {}

  async create(createProyectoDto: any): Promise<Proyecto> {
    const createdProyecto = new this.proyectoModel(createProyectoDto);
    return createdProyecto.save();
  }

  async findAll(): Promise<Proyecto[]> {
    return this.proyectoModel.find().exec();
  }

  async findOne(id: string): Promise<Proyecto> {
    return this.proyectoModel.findById(id).exec();
  }

  async update(id: string, updateProyectoDto: any): Promise<Proyecto> {
    return this.proyectoModel
      .findByIdAndUpdate(id, updateProyectoDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Proyecto> {
    return this.proyectoModel.findByIdAndRemove(id).exec();
  }
}
