import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proyecto, ProyectoDocument } from './model/project.schema';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectModel(Proyecto.name) private proyectoModel: Model<ProyectoDocument>,
  ) {}

  async countAll(): Promise<number> {
    return this.proyectoModel.countDocuments().exec();
  }

  async create(createProyectoDto: any): Promise<Proyecto> {
    const createdProyecto = new this.proyectoModel(createProyectoDto);
    return createdProyecto.save();
  }

  async findAllByFiltersWithLimit(
    publishedBy?: string,
    tagsProject?: string[],
    typeOfCase?: string[],
    cityOfProject?: string[],
    areaLegal?: string[],
    page: number = 1,
    limit: number = 10,
    maxTotalLimit: number = 1000,
    orderBy: string = 'asc',
  ): Promise<{ projects: Proyecto[]; hasMore: boolean }> {
    const orFilters = [];

    if (publishedBy) {
      orFilters.push({ publishedBy: publishedBy });
    }

    if (tagsProject && tagsProject.length) {
      orFilters.push({ tagsProject: { $all: tagsProject } });
    }

    if (typeOfCase && typeOfCase.length) {
      orFilters.push({ typeOfCase: { $in: typeOfCase } });
    }

    if (cityOfProject && cityOfProject.length) {
      orFilters.push({ cityOfProject: { $in: cityOfProject } });
    }

    if (areaLegal && areaLegal.length) {
      orFilters.push({ areaLegal: { $in: areaLegal } });
    }

    const filterCriteria: any = {};

    if (orFilters.length) {
      filterCriteria.$or = orFilters;
    }

    const skip = (page - 1) * limit;
    limit = Math.min(limit, maxTotalLimit);

    const projects = await this.proyectoModel
      .find(filterCriteria)
      .sort({ publishDate: orderBy === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit + 1)
      .exec();

    const hasMore = projects.length > limit;

    return {
      projects: projects.slice(0, limit),
      hasMore: hasMore,
    };
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

  async search(
    page: number,
    limit: number,
    orderby: string,
    searchDto: SearchDto,
  ): Promise<any> {
    // Crear un objeto de consulta basado en los campos del DTO
    const queryObj = {};
    for (const [key, value] of Object.entries(searchDto)) {
      if (value !== undefined && value !== null && value !== '') {
        queryObj[key] = value;
      }
    }

    // Preparar la consulta con el objeto de filtrado
    let query = this.proyectoModel.find(queryObj);

    // Aplicar la ordenación si se especifica
    if (orderby) {
      query = query.sort(orderby);
    }

    // Aplicar la paginación
    query = query.skip((page - 1) * limit).limit(limit);

    // Ejecutar la consulta
    const data = await query.exec();

    // Obtener el total de registros que coinciden con la consulta
    const total = await this.proyectoModel.countDocuments(queryObj);

    // Calcular si hay más proyectos para cargar
    const hasMore = page * limit < total;

    // Devolver la respuesta en el nuevo formato
    return {
      projects: data, // Cambiado de 'data' a 'projects'
      hasMore, // Añadido el campo hasMore
      // Puedes incluir los otros campos si lo consideras necesario
      // page,
      // limit,
      // orderby,
      // total,
    };
  }
}
