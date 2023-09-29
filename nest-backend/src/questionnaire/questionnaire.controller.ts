import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { Questionnaire } from './model/questionnaire.schema';

@Controller('questionnaires')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Post()
  async create(
    @Body() createQuestionnaire: Questionnaire,
  ): Promise<Questionnaire> {
    return this.questionnaireService.create(createQuestionnaire);
  }

  @Get()
  async findAll(
    @Query('proyectoId') proyectoId: string,
    @Query('titulo') titulo: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('orderBy') orderBy: string,
  ) {
    return this.questionnaireService.findAllByFiltersWithLimit(
      proyectoId,
      titulo,
      page,
      limit,
      undefined, // maxTotalLimit can be set here if needed
      orderBy,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Questionnaire> {
    return this.questionnaireService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionnaire: Questionnaire,
  ): Promise<Questionnaire> {
    return this.questionnaireService.update(id, updateQuestionnaire);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Questionnaire> {
    return this.questionnaireService.remove(id);
  }
}
