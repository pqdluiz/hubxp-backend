import {
  Controller,
  Req,
  Body,
  Res,
  Param,
  Delete,
  Put,
  Post,
} from '@nestjs/common';
import { Response } from 'express';
import { CoursesService } from './courses.service';
import { Prisma } from '@prisma/client';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('')
  public async createCourse(
    @Req() @Body() request: Prisma.CoursesCreateInput,
    @Res() response: Response,
  ): Promise<Response> {
    const course = this.coursesService.createCourse(request);

    try {
      return response.status(200).json(course);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  public async updateCourse(
    @Param('id') id: string,
    @Req() @Body() request: Prisma.CoursesUpdateInput,
    @Res() response: Response,
  ) {
    const course = await this.coursesService.updateCourse(request, id);

    try {
      return response.status(204).json(course);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete('id')
  public async removeCourse(
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    const course = await this.coursesService.removeCourse(id);

    try {
      return response.status(202).json(course);
    } catch (error) {
      throw new Error(error);
    }
  }
}
