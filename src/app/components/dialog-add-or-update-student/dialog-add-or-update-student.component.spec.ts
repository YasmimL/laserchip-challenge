import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddOrUpdateStudentComponent } from './dialog-add-or-update-student.component';

describe('DialogAddOrUpdateStudentComponent', () => {
  let component: DialogAddOrUpdateStudentComponent;
  let fixture: ComponentFixture<DialogAddOrUpdateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddOrUpdateStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddOrUpdateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
