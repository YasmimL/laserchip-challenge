import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  flushMicrotasks,
} from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of, throwError } from 'rxjs';
import { Gender } from 'src/app/enums/gender';
import { Student } from 'src/app/models/student';
import { StudentsService } from 'src/app/services/students.service';
import { StudentsComponent } from './students.component';

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;
  let studentsServiceStub: StudentsService;

  beforeEach(async () => {
    studentsServiceStub = jasmine.createSpyObj(StudentsService, {
      getStudents: of([
        new Student(1, 'Maria', 'Silva', 20, Gender.F),
        new Student(2, 'João', 'Sousa', 56, Gender.M),
        new Student(3, 'Joana', 'Moura', 23, Gender.F),
      ]),
      createStudent: of(new Student(1, 'Maria', 'Silva', 20, Gender.F)),
      updateStudent: of(new Student(2, 'João', 'Sousa', 56, Gender.M)),
      deleteStudent: new Observable((subscriber) => subscriber.next()),
    });

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
      ],
      declarations: [StudentsComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: {
            open: jasmine.createSpy('open').and.returnValue({
              afterClosed: () => of(true),
              componentInstance: {
                studentForm: {
                  value: {
                    id: 1,
                    name: 'Maria',
                    lastName: 'Silva',
                    age: 20,
                    gender: 'F',
                  },
                },
              },
            }),
          },
        },
        { provide: StudentsService, useValue: studentsServiceStub },
        {
          provide: MatSnackBar,
          useValue: {
            open: jasmine.createSpy('open'),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add student and get list of students', fakeAsync(() => {
    component.addStudent();

    flushMicrotasks();

    expect(studentsServiceStub.getStudents).toHaveBeenCalled();

    flush();
  }));

  it('should update student and get list of students', fakeAsync(() => {
    component.editStudent(new Student(2, 'João', 'Sousa', 56, Gender.M));

    flushMicrotasks();

    expect(studentsServiceStub.getStudents).toHaveBeenCalled();

    flush();
  }));

  it('should delete student and get list of students', fakeAsync(() => {
    component.deleteStudent(new Student(3, 'Joana', 'Moura', 23, Gender.F));

    flushMicrotasks();

    expect(studentsServiceStub.getStudents).toHaveBeenCalled();

    flush();
  }));

  it('should filter list of students', () => {
    const filterInput = fixture.nativeElement.querySelector('input[matInput]');
    filterInput.dispatchEvent(generateKeyUpEvent('ana'));

    expect(component.dataSource.filter).toEqual('ana');
  });

  it('should handle error when trying to add student', fakeAsync(() => {
    studentsServiceStub.createStudent = jasmine
      .createSpy()
      .and.returnValue(throwError(() => Error('fake error')));
    fixture.detectChanges();

    component.addStudent();

    flushMicrotasks();

    expect(component.snackBar.open).toHaveBeenCalled();

    flush();
  }));

  it('should handle error when trying to update student', fakeAsync(() => {
    studentsServiceStub.updateStudent = jasmine
      .createSpy()
      .and.returnValue(throwError(() => Error('fake error')));
    fixture.detectChanges();

    component.editStudent(new Student(2, 'João', 'Sousa', 56, Gender.M));

    flushMicrotasks();

    expect(component.snackBar.open).toHaveBeenCalled();

    flush();
  }));

  it('should handle error when trying to delete student', fakeAsync(() => {
    studentsServiceStub.deleteStudent = jasmine
      .createSpy()
      .and.returnValue(throwError(() => Error('fake error')));
    fixture.detectChanges();

    component.deleteStudent(new Student(3, 'Joana', 'Moura', 23, Gender.F));

    flushMicrotasks();

    expect(component.snackBar.open).toHaveBeenCalled();

    flush();
  }));
});

function generateKeyUpEvent(value: string): KeyboardEvent {
  const event: KeyboardEvent = new KeyboardEvent('keyup', {
    bubbles: true,
    cancelable: true,
  });
  Object.defineProperty(event, 'target', { value: { value } });

  return event;
}
