import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Gender } from '../enums/gender';
import { Student } from '../models/student';
import { StudentsService } from './students.service';

describe('StudentsService', () => {
  let service: StudentsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(StudentsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getStudents and return an array of Students', () => {
    service.getStudents().subscribe((res) => {
      expect(res).toEqual([
        new Student(1, 'Maria', 'Silva', 20, Gender.F),
        new Student(2, 'João', 'Sousa', 56, Gender.M),
        new Student(3, 'Joana', 'Moura', 23, Gender.F),
      ]);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: service.baseUrl,
    });

    req.flush(studentsMock());
  });

  it('should call createStudent and return the created student from the API', () => {
    const student = new Student(null, 'Maria', 'Silva', 20, Gender.F);
    const createdStudent = studentsMock()[0];

    service.createStudent(student).subscribe((response) => {
      expect(response).toEqual(new Student(1, 'Maria', 'Silva', 20, Gender.F));
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: service.baseUrl,
    });

    req.flush(createdStudent);
  });

  it('should call updateStudent and return the updated student from the API', () => {
    const student = new Student(1, 'Maria', 'Silva', 25, Gender.F);
    const updatedBook = { ...studentsMock()[0], idade: 25 };

    service.updateStudent(student).subscribe((response) => {
      expect(response).toEqual(student);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${service.baseUrl}/1`,
    });

    req.flush(updatedBook);
  });

  it('should call deleteStudent and return nothing from the API', () => {
    const studentId = 1;

    service.deleteStudent(studentId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${service.baseUrl}/1`,
    });

    req.flush(null);
  });
});

const studentsMock = () => [
  {
    id: 1,
    nome: 'Maria',
    sobrenome: 'Silva',
    idade: 20,
    sexo: 'F',
  },
  {
    id: 2,
    nome: 'João',
    sobrenome: 'Sousa',
    idade: 56,
    sexo: 'M',
  },
  {
    id: 3,
    nome: 'Joana',
    sobrenome: 'Moura',
    idade: 23,
    sexo: 'F',
  },
];
