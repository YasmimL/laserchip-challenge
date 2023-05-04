import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Gender } from '../enums/gender';
import { Student } from '../models/student';

interface ApiResponse {
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

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http
      .get<ApiResponse[]>(this.baseUrl)
      .pipe(
        map((response) =>
          response.map(
            (student) =>
              new Student(
                student.id,
                student.nome,
                student.sobrenome,
                student.idade,
                Gender[student.sexo]
              )
          )
        )
      );
  }
}
