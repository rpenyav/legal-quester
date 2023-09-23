// theme.controller.ts
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Theme } from './model/themes.schema';
import { ThemesService } from './themes.service';
import { JwtAuthGuard } from 'src/jwt-guard';

@Controller('theme')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Post('new')
  async create(@Body() theme: Theme) {
    try {
      return this.themesService.create(theme);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new Error('Internal server error');
    }
  }

  @Get('all')
  findAllThemes(): Promise<Theme[]> {
    return this.themesService.findAllThemesOrdered();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.themesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() theme: Theme) {
    return this.themesService.update(id, theme);
  }

  @Get('slug/:slugTheme')
  async findBySlug(@Param('slugTheme') slugTheme: string): Promise<Theme> {
    return await this.themesService.findBySlug(slugTheme);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.themesService.delete(id);
  }
}
