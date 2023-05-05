import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Gender, genderKeyFromValue } from '../enums/gender';
import { Student } from '../models/student';

interface ApiStudent {
  id: number;
  nome: string;
  sobrenome: string;
  idade: number;
  sexo: keyof typeof Gender;
}

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  baseUrl = 'https://api-laser-teste.herokuapp.com/alunos';
  private getUniqueId: () => number;

  constructor(private http: HttpClient) {
    this.getUniqueId = (() => {
      let _id = 20;

      return () => _id++;
    })();
  }

  getStudents(): Observable<Student[]> {
    return this.http
      .get<ApiStudent[]>(this.baseUrl)
      .pipe(
        map((response) =>
          response.map((student) => this.mapApiResponse(student))
        )
      );
  }

  createStudent(student: Student): Observable<Student> {
    return this.http
      .post<ApiStudent>(this.baseUrl, this.prepareRequestBody(student))
      .pipe(map((response) => this.mapApiResponse(response)));
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http
      .put<ApiStudent>(
        `${this.baseUrl}/${student.id}`,
        this.prepareRequestBody(student)
      )
      .pipe(map((response) => this.mapApiResponse(response)));
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  private mapApiResponse(response: ApiStudent): Student {
    return new Student(
      response.id,
      response.nome,
      response.sobrenome,
      response.idade,
      Gender[response.sexo]
    );
  }

  private prepareRequestBody(student: Student): ApiStudent {
    return {
      id: student.id ?? this.getUniqueId(),
      nome: student.name,
      sobrenome: student.lastName,
      idade: student.age,
      sexo: genderKeyFromValue(student.gender),
    };
  }
}
