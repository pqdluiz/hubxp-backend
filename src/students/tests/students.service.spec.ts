import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from '../students.service';
import { PrismaService } from '../../prisma';
import { Students } from '@prisma/client';
import { faker } from '@faker-js/faker';

const students: Students = {
  course: faker.commerce.productName(),
  email: faker.internet.email(),
  id: faker.database.mongodbObjectId(),
  name: faker.company.name(),
};

const prismaMock = {
  students: {
    create: jest.fn().mockReturnValue(students),
    findUnique: jest.fn().mockResolvedValue(students),
    update: jest.fn().mockResolvedValue(students),
    delete: jest.fn(),
    findMany: jest.fn().mockResolvedValue([students]),
  },
};

describe('StudentsService', () => {
  let service: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('should be success to create a new student', async () => {
    const actual = await service.createStudent(students);

    expect(actual).not.toBe(undefined);
    expect(actual).toEqual(students);
  });

  it('should be success to find one student', async () => {
    const actual = await service.findOneStudent(students?.id);

    expect(actual).not.toBe(undefined);
    expect(actual).toEqual(students);
  });

  it('should be success to find all students', async () => {
    const actual = await service.findAllStudents();

    expect(actual).not.toBe(undefined);
    expect(actual).toEqual([students]);
  });

  it('should be success to update student', async () => {
    const actual = await service.updateStudent(students, students?.id);

    expect(actual).not.toBe(undefined);
    expect(actual).toEqual(students);
  });

  it('should be success to remove student', async () => {
    const actual = await service.removeStudent(students?.id);

    expect(actual).toEqual(undefined);
  });
});
