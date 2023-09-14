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
} from '@nestjs/common';
import type { Response } from 'express';
import { StudentsService } from './students.service';
import type { Prisma } from '@prisma/client';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Get('')
  public async findAllStudents(@Res() response: Response) {
    const students = await this.studentService.findAllStudents();

    try {
      return response.status(200).json(students);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  public async findOneStudent(
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    const students = await this.studentService.findOneStudent(id);

    try {
      return response.status(200).json(students);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('')
  public async createStudent(
    @Req() @Body() request: Prisma.StudentsCreateInput,
    @Res() response: Response,
  ) {
    const student = await this.studentService.createStudent(request);

    try {
      return response.status(201).json(student);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  public async updateStudent(
    @Req() @Body() request: Prisma.StudentsUpdateInput,
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    const student = await this.studentService.updateStudent(request, id);

    try {
      return response.status(202).json(student);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  public async removeStudent(
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    const student = await this.studentService.removeStudent(id);

    try {
      return response.status(202).json(student);
    } catch (error) {
      throw new Error(error);
    }
  }
}
