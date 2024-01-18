import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { ApiService } from '../api/api.service';
import { HttpException} from '@nestjs/common';

class ApiServiceMock {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getStudent(_firstName: string, _lastName: string) {
    return {
      name: 'Jane Doe',
      grades: [3.7, 3.8, 3.9, 4.0, 3.6],
    };
  }
}

class ApiServiceMockFail {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getStudent(_firstName: string, _lastName: string) {
    return {
      name: 'Jane Doe',
    };
  }
}

describe('StudentService', () => {
  let studentService: StudentService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: ApiService,
      useClass: ApiServiceMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentService, ApiServiceProvider],
    }).compile();

    studentService = module.get<StudentService>(StudentService);
  });

  it('StudentService - should be defined', () => {
    expect(studentService).toBeDefined();
  });

  describe('getGpa', () => {
    it('should get student GPA', async () => {
      const expectedGpa = 3.8;
      const gpa = await studentService.getGpa('Jane', 'Doe');
      expect(gpa).toEqual(expectedGpa);
    });
  });
});

describe('StudentServiceFailure', () => {
  let studentService: StudentService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: ApiService,
      useClass: ApiServiceMockFail,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentService, ApiServiceProvider],
    }).compile();

    studentService = module.get<StudentService>(StudentService);
  });

  it('StudentService - should be defined', () => {
    expect(studentService).toBeDefined();
  });

  describe('getGpa', () => {
    it('should give exception for student GPA', async () => {
      await expect(studentService.getGpa('Jane', 'Doe'))
      .rejects.toThrow(HttpException);
    });
  });
});
