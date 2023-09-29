import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proposal, ProposalDocument } from './model/proposals.schema';

@Injectable()
export class ProposalsService {
  constructor(
    @InjectModel(Proposal.name) private proposalModel: Model<ProposalDocument>,
    private configService: ConfigService,
  ) {}

  async create(proposal: Proposal): Promise<Proposal> {
    try {
      // Calcular la fecha de expiración
      const proposalDate = new Date(proposal.proposalDate);
      proposalDate.setMonth(proposalDate.getMonth() + 1);
      proposal.expireDate = proposalDate;

      const createdProposal = new this.proposalModel(proposal);
      return createdProposal.save();
    } catch (error) {
      // Si estás usando MongoDB con Mongoose
      if (error.name === 'MongoError' && error.code === 11000) {
        throw new ConflictException('El proposalReference ya existe');
      }

      // Otros errores
      throw new BadRequestException('Error creating proposal');
    }
  }

  async findAllByFiltersWithLimit(
    publishedBy?: string,
    tagsProposal?: string[],
    page: number = 1,
    limit: number = 10,
    maxTotalLimit: number = 1000,
    orderBy: string = 'asc',
  ): Promise<{ proposals: Proposal[]; hasMore: boolean }> {
    const filterCriteria: any = {};

    // Si el publishedBy es proporcionado, lo agregamos al filtro.
    if (publishedBy) {
      filterCriteria.publishedBy = publishedBy;
    }

    // Si tagsProposal es proporcionado, lo agregamos al filtro.
    if (tagsProposal && tagsProposal.length) {
      filterCriteria.tagsProposal = { $all: tagsProposal };
    }

    // Calcula el número de documentos a omitir antes de comenzar a devolver resultados.
    const skip = (page - 1) * limit;

    // Aplicar el límite global para 'limit'
    limit = Math.min(limit, maxTotalLimit);

    // Consultamos 'limit + 1' registros para determinar si hay más páginas.
    const proposals = await this.proposalModel
      .find(filterCriteria)
      .sort({ publishDate: orderBy === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit + 1)
      .exec();

    // Determina si hay más páginas.
    const hasMore = proposals.length > limit;

    // Devuelve solo 'limit' registros y el indicador 'hasMore'.
    return {
      proposals: proposals.slice(0, limit),
      hasMore: hasMore,
    };
  }

  async findBySlug(slugProposal: string): Promise<Proposal> {
    try {
      return await this.proposalModel.findOne({ slugProposal });
    } catch (error) {
      throw new BadRequestException('Error finding proposal by slug');
    }
  }

  async findProposalsByUser(userId: string): Promise<Proposal[]> {
    try {
      return await this.proposalModel.find({ user: userId });
    } catch (error) {
      throw new BadRequestException('Error finding proposals by user');
    }
  }

  async findOne(id: string): Promise<Proposal> {
    return this.proposalModel.findById(id);
  }

  async update(id: string, proposal: Proposal): Promise<Proposal> {
    return this.proposalModel.findByIdAndUpdate(id, proposal, { new: true });
  }

  async delete(id: string): Promise<Proposal> {
    return this.proposalModel.findByIdAndRemove(id);
  }
}
