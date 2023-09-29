import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Questionnaire,
  QuestionnaireDocument,
} from './model/questionnaire.schema';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectModel(Questionnaire.name)
    private questionnaireModel: Model<QuestionnaireDocument>,
  ) {}

  async countAll(): Promise<number> {
    return this.questionnaireModel.countDocuments().exec();
  }

  async create(createQuestionnaire: Questionnaire): Promise<Questionnaire> {
    const createdQuestionnaire = new this.questionnaireModel(
      createQuestionnaire,
    );
    return createdQuestionnaire.save();
  }

  async findAllByFiltersWithLimit(
    proyectoId?: string,
    titulo?: string,
    page: number = 1,
    limit: number = 10,
    maxTotalLimit: number = 1000,
    orderBy: string = 'asc',
  ): Promise<{ questionnaires: Questionnaire[]; hasMore: boolean }> {
    const orFilters = [];

    if (proyectoId) {
      orFilters.push({ proyectoId: proyectoId });
    }

    if (titulo) {
      orFilters.push({ titulo: titulo });
    }

    const filterCriteria: any = {};

    if (orFilters.length) {
      filterCriteria.$or = orFilters;
    }

    const skip = (page - 1) * limit;
    limit = Math.min(limit, maxTotalLimit);

    const questionnaires = await this.questionnaireModel
      .find(filterCriteria)
      .sort({ createdAt: orderBy === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit + 1)
      .exec();

    const hasMore = questionnaires.length > limit;

    return {
      questionnaires: questionnaires.slice(0, limit),
      hasMore: hasMore,
    };
  }

  async findOne(id: string): Promise<Questionnaire> {
    return this.questionnaireModel.findById(id).exec();
  }

  async update(
    id: string,
    updateQuestionnaire: Questionnaire,
  ): Promise<Questionnaire> {
    return this.questionnaireModel
      .findByIdAndUpdate(id, updateQuestionnaire, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Questionnaire> {
    return this.questionnaireModel.findByIdAndRemove(id).exec();
  }
}
