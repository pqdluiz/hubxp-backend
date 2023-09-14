import {
  Controller,
  Get,
  Res,
  Req,
  Body,
  Post,
  Param,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import type { Response } from 'express';
import { StudentsService } from './students.service';
import type { Prisma } from '@prisma/client';
import { ApiBody } from '@nestjs/swagger';
import { options } from './options';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Get('')
  @HttpCode(200)
  public async findAllStudents(@Res() response: Response): Promise<Response> {
    const students = await this.studentService.findAllStudents();

    try {
      return response.status(200).json(students);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  @HttpCode(200)
  public async findOneStudent(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response> {
    const students = await this.studentService.findOneStudent(id);

    try {
      return response.status(200).json(students);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('')
  @HttpCode(201)
  @ApiBody(options)
  public async createStudent(
    @Req() @Body() request: Prisma.StudentsCreateInput,
    @Res() response: Response,
  ): Promise<Response> {
    const student = await this.studentService.createStudent(request);

    try {
      return response.status(201).json(student);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  @ApiBody(options)
  @HttpCode(202)
  public async updateStudent(
    @Req() @Body() request: Prisma.StudentsUpdateInput,
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response> {
    const student = await this.studentService.updateStudent(request, id);

    try {
      return response.status(202).json(student);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  @HttpCode(202)
  public async removeStudent(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response> {
    const student = await this.studentService.removeStudent(id);

    try {
      return response.status(202).json(student);
    } catch (error) {
      throw new Error(error);
    }
  }
}
