import { Controller, Get, Res, Req, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { Response, Request } from 'express';
import { StudentsService } from './students.service';
import { Prisma } from '@prisma/client';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Get('')
  async findAllStudents(@Res() response: Response) {
    const students = await this.studentService.findAllStudents();

    try {
      response.status(200).json(students);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('')
  async createStudent(
    @Req() @Body() request: Prisma.StudentsCreateInput,
    @Res() response: Response,
  ) {
    const student = await this.studentService.createStudent(request);

    try {
      response.status(201).json(student);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  async updateStudent(
    @Req() @Body() request: Prisma.StudentsUpdateInput,
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    const student = this.studentService.updateStudent(request, id);

    try {
      response.status(202).json(student);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(":id")
  async removeStudent(@Param("id") id: string, @Res() response: Response) {
    const student = await this.studentService.removeStudent(id);

    try {
      response.status(202).json(student);
    } catch (error) {
      throw new Error(error);
    }
  }
}
