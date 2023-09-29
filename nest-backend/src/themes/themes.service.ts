import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Theme, ThemeDocument } from './model/themes.schema';

@Injectable()
export class ThemesService {
  constructor(
    @InjectModel(Theme.name) private themeModel: Model<ThemeDocument>,
    private configService: ConfigService,
  ) {}

  async create(theme: Theme): Promise<Theme> {
    try {
      const createdTheme = new this.themeModel(theme);
      return createdTheme.save();
    } catch (error) {
      throw new BadRequestException('Error creating theme');
    }
  }

  async findAllThemesOrdered(): Promise<Theme[]> {
    return this.themeModel.find().sort({ nameThemeEN: 1 }).exec();
  }

  async findBySlug(slugTheme: string): Promise<Theme> {
    try {
      return await this.themeModel.findOne({ slugTheme });
    } catch (error) {
      throw new BadRequestException('Error finding theme by slug');
    }
  }

  async findOne(id: string): Promise<Theme> {
    return this.themeModel.findById(id);
  }

  async update(id: string, theme: Theme): Promise<Theme> {
    return this.themeModel.findByIdAndUpdate(id, theme, { new: true });
  }

  async delete(id: string): Promise<Theme> {
    return this.themeModel.findByIdAndRemove(id);
  }
}
