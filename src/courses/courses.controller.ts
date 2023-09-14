import {
  Controller,
  Req,
  Body,
  Res,
  Param,
  Delete,
  Put,
  Post,
  Get,
  HttpCode,
} from '@nestjs/common';
import type { Response } from 'express';
import { CoursesService } from './courses.service';
import type { Prisma } from '@prisma/client';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('')
  @HttpCode(200)
  public async findAllCourses(@Res() response: Response): Promise<Response> {
    const courses = await this.coursesService.findAllCourses();

    try {
      return response.status(200).json(courses);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('')
  @HttpCode(201)
  public async createCourse(
    @Req() @Body() request: Prisma.CoursesCreateInput,
    @Res() response: Response,
  ): Promise<Response> {
    const course = await this.coursesService.createCourse(request);

    try {
      return response.status(201).json(course);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  @HttpCode(202)
  public async updateCourse(
    @Param('id') id: string,
    @Req() @Body() request: Prisma.CoursesUpdateInput,
    @Res() response: Response,
  ): Promise<Response> {
    const course = await this.coursesService.updateCourse(request, id);

    try {
      return response.status(204).json(course);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete('id')
  @HttpCode(204)
  public async removeCourse(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response> {
    const course = await this.coursesService.removeCourse(id);

    try {
      return response.status(204).json(course);
    } catch (error) {
      throw new Error(error);
    }
  }
}
