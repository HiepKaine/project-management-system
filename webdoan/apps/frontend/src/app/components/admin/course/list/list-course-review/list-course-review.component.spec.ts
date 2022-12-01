import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCourseReviewComponent } from './list-course-review.component';

describe('ListCourseReviewComponent', () => {
  let component: ListCourseReviewComponent;
  let fixture: ComponentFixture<ListCourseReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCourseReviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCourseReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
