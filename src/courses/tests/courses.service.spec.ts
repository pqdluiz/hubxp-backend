import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from '../courses.service';
import { Courses } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/af_ZA';
import { CoursesController } from '../courses.controller';
import { PrismaService } from '../../prisma';

const courses: Courses = {
  id: faker.database.mongodbObjectId(),
  name: faker.company.name(),
};

const prismaMock = {
  courses: {
    create: jest.fn().mockReturnValue(courses),
    findUnique: jest.fn().mockResolvedValue(courses),
    update: jest.fn().mockResolvedValue(courses),
    delete: jest.fn(),
    findMany: jest.fn().mockResolvedValue([courses]),
  },
};

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
      controllers: [CoursesController],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
  });

  it('should be success to create a new course', async () => {
    const actual = await service.createCourse(courses);

    expect(actual).not.toBe(undefined);
    expect(actual).toEqual(courses);
  });

  it('should be success to find all courses', async () => {
    const actual = await service.findAllCourses();

    expect(actual).not.toBe(undefined);
    expect(actual).toEqual([courses]);
  });

  it('should be success to remove course', async () => {
    const actual = await service.removeCourse(courses?.id);

    expect(actual).toEqual(undefined);
  });

  it('should be success to update course', async () => {
    const actual = await service.updateCourse(courses, courses?.id);

    expect(actual).not.toBe(undefined);
    expect(actual).toEqual(courses);
  });
});
