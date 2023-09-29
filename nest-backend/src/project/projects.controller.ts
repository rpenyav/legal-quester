import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
  ParseArrayPipe,
} from '@nestjs/common';
import { ProyectosService } from './projects.service';
import { Proyecto } from './model/project.schema';
import { SearchDto } from './dto/search.dto';

@Controller('projects')
export class ProyectoController {
  constructor(private readonly projectsService: ProyectosService) {}

  @Post()
  async create(@Body() createProyectoDto: any): Promise<Proyecto> {
    return this.projectsService.create(createProyectoDto);
  }

  @Get()
  async getAllProjects(
    @Query('publishedBy') publishedBy?: string,
    @Query('tagsProject', new ParseArrayPipe({ optional: true }))
    tagsProject?: string[],
    @Query('typeOfCase', new ParseArrayPipe({ optional: true }))
    typeOfCase?: string[],
    @Query('cityOfProject', new ParseArrayPipe({ optional: true }))
    cityOfProject?: string[],
    @Query('areaLegal', new ParseArrayPipe({ optional: true }))
    areaLegal?: string[],
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('orderBy') orderBy: string = 'asc',
  ) {
    const maxTotalLimit = 1000;
    const result = await this.projectsService.findAllByFiltersWithLimit(
      publishedBy,
      tagsProject,
      typeOfCase,
      cityOfProject,
      areaLegal,
      page,
      limit,
      maxTotalLimit,
      orderBy,
    );

    return {
      projects: result.projects,
      hasMore: result.hasMore,
    };
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

  @Post('search')
  async search(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('orderby') orderby: string,
    @Body() searchDto: SearchDto,
  ): Promise<any> {
    return this.projectsService.search(page, limit, orderby, searchDto);
  }
}
