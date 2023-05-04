import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/app/models/student';

interface DialogData {
  student: Student;
}

@Component({
  selector: 'app-dialog-delete-student',
  templateUrl: './dialog-delete-student.component.html',
  styleUrls: ['./dialog-delete-student.component.scss'],
})
export class DialogDeleteStudentComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
