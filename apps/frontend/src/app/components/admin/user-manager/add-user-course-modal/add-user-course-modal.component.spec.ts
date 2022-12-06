import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserCourseModalComponent } from './add-user-course-modal.component';

describe('AddUserCourseModalComponent', () => {
  let component: AddUserCourseModalComponent;
  let fixture: ComponentFixture<AddUserCourseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserCourseModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
