import { Injectable } from '@nestjs/common';
import { Prisma, Students } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  public async createStudent(
    student: Prisma.StudentsCreateInput,
  ): Promise<Prisma.StudentsCreateInput> {
    return await this.prisma.students.create({ data: student });
  }

  public async findAllStudents(): Promise<Students[]> {
    return await this.prisma.students.findMany();
  }

  public async removeStudent(id: string): Promise<Students> {
    return await this.prisma.students.delete({ where: { id: id } });
  }

  public async updateStudent(
    student: Prisma.StudentsUpdateInput,
    id: string,
  ): Promise<Students> {
    return await this.prisma.students.update({
      data: student,
      where: { id: id },
    });
  }
}
