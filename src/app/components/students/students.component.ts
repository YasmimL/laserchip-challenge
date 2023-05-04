import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/models/student';
import { StudentsService } from 'src/app/services/students.service';

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

  constructor(private studentsService: StudentsService) {
    this.dataSource = new MatTableDataSource(this.students);
  }

  ngAfterViewInit() {
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
}
