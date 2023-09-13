import { Injectable } from '@nestjs/common';
import { Courses, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAllCourses(): Promise<Courses[]> {
    return await this.prisma.courses.findMany();
  }

  public async createCourse(
    course: Prisma.CoursesCreateInput,
  ): Promise<Courses> {
    return await this.prisma.courses.create({ data: course });
  }

  public async updateCourse(
    course: Prisma.CoursesUpdateInput,
    id: string,
  ): Promise<Courses> {
    return this.prisma.courses.update({ data: course, where: { id: id } });
  }

  public async removeCourse(id: string): Promise<Courses> {
    return await this.prisma.courses.delete({ where: { id: id } });
  }
}
