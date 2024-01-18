import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from './api.service';
import { HttpService, HttpModule } from '@nestjs/axios';
import { AxiosHeaders, AxiosResponse } from 'axios';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpService: HttpService;
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiService],
      imports: [HttpModule],
    }).compile();

    service = module.get<ApiService>(ApiService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('ApiService - should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getGpa', () => {
    it('should get student GPA', async () => {
      const result: AxiosResponse = {
        data: {
          name: 'Jane Doe',
          grades: [3.7, 3.8, 3.9, 4.0, 3.6],
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: {} as AxiosHeaders
        },
      };
      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
      const expectedGpa ={
        name: 'Jane Doe',
        grades: [3.7, 3.8, 3.9, 4.0, 3.6],
      };
      const gpa = await service.getStudent({firstName:'Jane', lastName:'Doe'});
      expect(gpa).toEqual(expectedGpa);
    });
  });
});
