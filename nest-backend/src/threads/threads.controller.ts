// thread.controller.ts
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
} from '@nestjs/common';
import { Thread } from './model/threads.schema';
import { ThreadsService } from './threads.service';

@Controller('thread')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post('new')
  async create(@Body() thread: Thread) {
    try {
      return this.threadsService.create(thread);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new Error('Internal server error');
    }
  }

  @Get('all')
  async getAllThreads(
    @Query('owner') owner?: string,
    @Query('threadTemathic', new ParseArrayPipe({ optional: true }))
    threadTemathic?: string[],
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('orderBy') orderBy: string = 'asc', // Nuevo parámetro de ordenación
  ) {
    const maxTotalLimit = 1000;
    const result = await this.threadsService.findAllByFiltersWithLimit(
      owner,
      threadTemathic,
      page,
      limit,
      maxTotalLimit,
      orderBy, // Pasa el nuevo parámetro al servicio
    );

    return {
      threads: result.threads,
      hasMore: result.hasMore,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.threadsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() thread: Thread) {
    return this.threadsService.update(id, thread);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.threadsService.delete(id);
  }
}
