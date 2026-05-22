import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RutinasModule } from '../rutinas/rutinas.module';

@Module({
  imports: [PrismaModule, RutinasModule],
  providers: [AiService],
  controllers: [AiController],
})
export class AiModule {}
