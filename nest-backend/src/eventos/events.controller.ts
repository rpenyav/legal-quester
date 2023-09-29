// event.controller.ts
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
import { Event } from './model/events.schema';
import { EventsService } from './events.service';

@Controller('event')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('new')
  async create(@Body() event: Event) {
    try {
      return this.eventsService.create(event);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new Error('Internal server error');
    }
  }

  @Get('all')
  async getAllEvents(
    @Query('publishedBy') publishedBy?: string,
    @Query('tagsEvent', new ParseArrayPipe({ optional: true }))
    tagsEvent?: string[],
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('orderBy') orderBy: string = 'asc',
  ) {
    const maxTotalLimit = 1000;
    const result = await this.eventsService.findAllByFiltersWithLimit(
      publishedBy,
      tagsEvent,
      page,
      limit,
      maxTotalLimit,
      orderBy,
    );

    return {
      events: result.events,
      hasMore: result.hasMore,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() event: Event) {
    return this.eventsService.update(id, event);
  }

  @Get('slug/:slugEvent')
  async findBySlug(@Param('slugEvent') slugEvent: string): Promise<Event> {
    return await this.eventsService.findBySlug(slugEvent);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.eventsService.delete(id);
  }
}
