import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseExamPackComponent } from './course-item.component';

describe('CourseExamPackComponent', () => {
  let component: CourseExamPackComponent;
  let fixture: ComponentFixture<CourseExamPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseExamPackComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseExamPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
