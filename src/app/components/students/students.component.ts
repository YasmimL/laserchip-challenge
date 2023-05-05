import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Gender } from 'src/app/enums/gender';
import { Student } from 'src/app/models/student';
import { StudentsService } from 'src/app/services/students.service';
import { DialogAddOrUpdateStudentComponent } from '../dialog-add-or-update-student/dialog-add-or-update-student.component';
import { DialogDeleteStudentComponent } from '../dialog-delete-student/dialog-delete-student.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements AfterViewInit {
  students: Student[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'lastName',
    'age',
    'gender',
    'actions',
  ];
  dataSource: MatTableDataSource<Student>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private studentsService: StudentsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource(this.students);
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Itens por página:';
    }
    this.dataSource.paginator = this.paginator;
    this.getStudents();
  }

  getStudents(): void {
    this.studentsService.getStudents().subscribe((students) => {
      this.students = students;
      this.dataSource.data = this.students;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addStudent() {
    const dialogRef = this.dialog.open(DialogAddOrUpdateStudentComponent, {
      data: { student: null },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        const { value: formValue } = dialogRef.componentInstance.studentForm;
        const student = {
          ...formValue,
          gender: Gender[formValue.gender as 'F' | 'M'],
        } as Student;

        this.studentsService.createStudent(student).subscribe({
          next: () => {
            this.getStudents();
            this.openSnackBar('Aluno adicionado com sucesso!');
          },
          error: (err) => {
            this.openSnackBar('Ocorreu um erro ao adicionar aluno.');
            console.error(err);
          },
        });
      }
    });
  }

  editStudent(student: Student) {
    const dialogRef = this.dialog.open(DialogAddOrUpdateStudentComponent, {
      data: { student },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        const { value: formValue } = dialogRef.componentInstance.studentForm;
        const student = {
          ...formValue,
          gender: Gender[formValue.gender as 'F' | 'M'],
        } as Student;

        this.studentsService.updateStudent(student).subscribe({
          next: () => {
            this.getStudents();
            this.openSnackBar('Aluno alterado com sucesso!');
          },
          error: (err) => {
            this.openSnackBar('Ocorreu um erro ao alterar aluno.');
            console.error(err);
          },
        });
      }
    });
  }

  deleteStudent(student: Student) {
    const dialogRef = this.dialog.open(DialogDeleteStudentComponent, {
      data: { student },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.studentsService.deleteStudent(student.id!).subscribe({
          next: () => {
            this.getStudents();
            this.openSnackBar('Aluno removido com sucesso!');
          },
          error: (err) => {
            this.openSnackBar('Ocorreu um erro ao remover aluno.');
            console.error(err);
          },
        });
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
