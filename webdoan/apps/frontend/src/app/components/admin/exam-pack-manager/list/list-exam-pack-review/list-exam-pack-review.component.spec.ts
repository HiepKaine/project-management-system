import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExamPackReviewComponent } from './list-exam-pack-review.component';

describe('ListExamPackReviewComponent', () => {
  let component: ListExamPackReviewComponent;
  let fixture: ComponentFixture<ListExamPackReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListExamPackReviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExamPackReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
