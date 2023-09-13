import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaService } from 'src/prisma';

@Module({
  providers: [CoursesService, PrismaService],
  controllers: [CoursesController]
})
export class CoursesModule {}
