// thread.service.ts
import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as jsrsasign from 'jsrsasign';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Thread, ThreadSchema, ThreadDocument } from './model/threads.schema';

@Injectable()
export class ThreadsService {
  constructor(
    @InjectModel(Thread.name) private threadModel: Model<ThreadDocument>,
    private configService: ConfigService,
  ) {}

  async create(thread: Thread): Promise<Thread> {
    try {
      const createdThread = new this.threadModel(thread);
      return createdThread.save();
    } catch (error) {
      throw new BadRequestException('Error creating thread');
    }
  }

  async findAllByFiltersWithLimit(
    ownerId?: string,
    threadTemathic?: string[],
    page: number = 1,
    limit: number = 10,
    maxTotalLimit: number = 1000,
    orderBy: string = 'asc',
  ): Promise<{ threads: Thread[]; hasMore: boolean }> {
    const filterCriteria: any = {};

    // Si el ownerId es proporcionado, lo agregamos al filtro.
    if (ownerId) {
      filterCriteria.owner = ownerId;
    }

    // Si threadTemathic es proporcionado, lo agregamos al filtro.
    if (threadTemathic && threadTemathic.length) {
      filterCriteria.threadTemathic = { $in: threadTemathic };
    }

    // Calcula el número de documentos a omitir antes de comenzar a devolver resultados.
    const skip = (page - 1) * limit;

    // Aplicar el límite global para 'limit'
    limit = Math.min(limit, maxTotalLimit);

    // Consultamos 'limit + 1' registros para determinar si hay más páginas.
    const threads = await this.threadModel
      .find(filterCriteria)
      .sort({ publishDate: orderBy === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit + 1)
      .exec();

    // Determina si hay más páginas.
    const hasMore = threads.length > limit;

    // Devuelve solo 'limit' registros y el indicador 'hasMore'.
    return {
      threads: threads.slice(0, limit),
      hasMore: hasMore,
    };
  }

  async findOne(id: string): Promise<Thread> {
    const thread = await this.threadModel.findById(id);

    return thread;
  }

  async update(id: string, thread: Thread): Promise<Thread> {
    return this.threadModel.findByIdAndUpdate(id, thread, { new: true });
  }

  async delete(id: string): Promise<Thread> {
    return this.threadModel.findByIdAndRemove(id);
  }
}
