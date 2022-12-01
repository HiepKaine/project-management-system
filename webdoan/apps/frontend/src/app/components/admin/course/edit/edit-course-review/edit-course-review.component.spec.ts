import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseReviewComponent } from './edit-course-review.component';

describe('EditCourseReviewComponent', () => {
  let component: EditCourseReviewComponent;
  let fixture: ComponentFixture<EditCourseReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCourseReviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
