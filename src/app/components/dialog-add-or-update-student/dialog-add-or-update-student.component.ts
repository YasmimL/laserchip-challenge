import { Component, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Gender, genderKeyFromValue } from 'src/app/enums/gender';
import { Student } from 'src/app/models/student';

interface DialogData {
  student: Student | null;
}

@Component({
  selector: 'app-dialog-add-or-update-student',
  templateUrl: './dialog-add-or-update-student.component.html',
  styleUrls: ['./dialog-add-or-update-student.component.scss'],
})
export class DialogAddOrUpdateStudentComponent {
  GenderEnum = Gender;
  studentForm: FormGroup = this.formBuilder.group({
    id: [undefined],
    name: [undefined, [Validators.required]],
    lastName: [undefined, [Validators.required]],
    age: [undefined, [Validators.required]],
    gender: [undefined, [Validators.required]],
  });

  constructor(
    public dialogRef: MatDialogRef<DialogAddOrUpdateStudentComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    if (this.data.student) {
      this.studentForm.patchValue({
        ...this.data.student,
        gender: genderKeyFromValue(this.data.student.gender),
      });
    }
  }

  submit() {
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
