// proposal.controller.ts
import {
  BadRequestException,
  Body,
  ConflictException,
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
import { Proposal } from './model/proposals.schema';
import { ProposalsService } from './proposals.service';
import { logger } from 'src/winston.config';

@Controller('proposal')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Post('new')
  async create(@Body() proposal: Proposal) {
    try {
      return await this.proposalsService.create(proposal);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }

      // Registrar el error original
      logger.error(`Failed to create proposal: ${error.message}`);

      throw new Error('Registro duplicado');
    }
  }

  @Get('all')
  async getAllProposals(
    @Query('publishedBy') publishedBy?: string,
    @Query('tagsProposal', new ParseArrayPipe({ optional: true }))
    tagsProposal?: string[],
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('orderBy') orderBy: string = 'asc',
  ) {
    const maxTotalLimit = 1000;
    const result = await this.proposalsService.findAllByFiltersWithLimit(
      publishedBy,
      tagsProposal,
      page,
      limit,
      maxTotalLimit,
      orderBy,
    );

    return {
      proposals: result.proposals,
      hasMore: result.hasMore,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.proposalsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() proposal: Proposal) {
    return this.proposalsService.update(id, proposal);
  }

  @Get('/proposalbyuser/:userId')
  async findProposalsByUser(
    @Param('userId') userId: string,
  ): Promise<Proposal[]> {
    return this.proposalsService.findProposalsByUser(userId);
  }

  @Get('slug/:slugProposal')
  async findBySlug(
    @Param('slugProposal') slugProposal: string,
  ): Promise<Proposal> {
    return await this.proposalsService.findBySlug(slugProposal);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    return this.proposalsService.delete(id);
  }
}
