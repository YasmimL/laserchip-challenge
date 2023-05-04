import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddOrUpdateStudentComponent } from './modal-add-or-update-student.component';

describe('ModalAddOrUpdateStudentComponent', () => {
  let component: ModalAddOrUpdateStudentComponent;
  let fixture: ComponentFixture<ModalAddOrUpdateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddOrUpdateStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddOrUpdateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
