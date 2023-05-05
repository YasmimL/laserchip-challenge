import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Gender } from 'src/app/enums/gender';
import { Student } from 'src/app/models/student';
import { DialogAddOrUpdateStudentComponent } from './dialog-add-or-update-student.component';

describe('DialogAddOrUpdateStudentComponent', () => {
  let component: DialogAddOrUpdateStudentComponent;
  let fixture: ComponentFixture<DialogAddOrUpdateStudentComponent>;
  let dialogRef: MatDialogRef<DialogAddOrUpdateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddOrUpdateStudentComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: jasmine.createSpy('close'),
          },
        },
        { provide: MAT_DIALOG_DATA, useValue: { student: student() } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogAddOrUpdateStudentComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the student data', () => {
    expect(component.data.student).toEqual(student());
  });

  it('should call the close method on dialog reference when close button is clicked', () => {
    component.closeDialog();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should call the close method on dialog reference when submit button is clicked', () => {
    component.submit();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});

const student = () => {
  return new Student(1, 'Maria', 'Silva', 20, Gender.F);
};
