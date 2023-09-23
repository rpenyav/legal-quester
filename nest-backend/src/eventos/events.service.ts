import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './model/events.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    private configService: ConfigService,
  ) {}

  async create(event: Event): Promise<Event> {
    try {
      const createdEvent = new this.eventModel(event);
      return createdEvent.save();
    } catch (error) {
      throw new BadRequestException('Error creating event');
    }
  }

  async findAllByFiltersWithLimit(
    publishedBy?: string,
    tagsEvent?: string[],
    page: number = 1,
    limit: number = 10,
    maxTotalLimit: number = 1000,
    orderBy: string = 'asc',
  ): Promise<{ events: Event[]; hasMore: boolean }> {
    const filterCriteria: any = {};

    // Si el publishedBy es proporcionado, lo agregamos al filtro.
    if (publishedBy) {
      filterCriteria.publishedBy = publishedBy;
    }

    // Si tagsEvent es proporcionado, lo agregamos al filtro.
    if (tagsEvent && tagsEvent.length) {
      filterCriteria.tagsEvent = { $all: tagsEvent };
    }

    // Calcula el número de documentos a omitir antes de comenzar a devolver resultados.
    const skip = (page - 1) * limit;

    // Aplicar el límite global para 'limit'
    limit = Math.min(limit, maxTotalLimit);

    // Consultamos 'limit + 1' registros para determinar si hay más páginas.
    const events = await this.eventModel
      .find(filterCriteria)
      .sort({ publishDate: orderBy === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit + 1)
      .exec();

    // Determina si hay más páginas.
    const hasMore = events.length > limit;

    // Devuelve solo 'limit' registros y el indicador 'hasMore'.
    return {
      events: events.slice(0, limit),
      hasMore: hasMore,
    };
  }

  async findBySlug(slugEvent: string): Promise<Event> {
    try {
      return await this.eventModel.findOne({ slugEvent });
    } catch (error) {
      throw new BadRequestException('Error finding event by slug');
    }
  }

  async findOne(id: string): Promise<Event> {
    return this.eventModel.findById(id);
  }

  async update(id: string, event: Event): Promise<Event> {
    return this.eventModel.findByIdAndUpdate(id, event, { new: true });
  }

  async delete(id: string): Promise<Event> {
    return this.eventModel.findByIdAndRemove(id);
  }
}
