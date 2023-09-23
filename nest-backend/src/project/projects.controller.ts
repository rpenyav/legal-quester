import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProyectosService } from './projects.service';
import { Proyecto } from './model/project.schema';

@Controller('projects')
export class ProyectoController {
  constructor(private readonly projectsService: ProyectosService) {}

  @Post()
  async create(@Body() createProyectoDto: any): Promise<Proyecto> {
    return this.projectsService.create(createProyectoDto);
  }

  @Get()
  async findAll(): Promise<Proyecto[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Proyecto> {
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProyectoDto: any,
  ): Promise<Proyecto> {
    return this.projectsService.update(id, updateProyectoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Proyecto> {
    return this.projectsService.remove(id);
  }
}
