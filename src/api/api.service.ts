import { Injectable } from '@nestjs/common';
import { Student } from '../student/student.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ApiService {
  constructor(private http: HttpService) {}

  async getStudent({ firstName, lastName }: { firstName: string; lastName: string; }): Promise<Student> {
    const url = `../get-student?firstName=${firstName}&lastName=${lastName}`;
    const response = await this.http.get(url).toPromise();
    return response.data;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
