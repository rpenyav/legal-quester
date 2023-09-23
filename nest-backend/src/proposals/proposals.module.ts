import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ProposalsController } from './proposals.controller';
import { ProposalsService } from './proposals.service';
import { ProposalSchema } from './model/proposals.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'Proposal', schema: ProposalSchema }]),
  ],
  controllers: [ProposalsController],
  providers: [ProposalsService],
})
export class ProposalsModule {}
