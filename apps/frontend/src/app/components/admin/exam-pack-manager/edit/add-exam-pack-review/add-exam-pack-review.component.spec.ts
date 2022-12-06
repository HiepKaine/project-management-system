import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamPackReviewComponent } from './add-exam-pack-review.component';

describe('AddExamPackReviewComponent', () => {
  let component: AddExamPackReviewComponent;
  let fixture: ComponentFixture<AddExamPackReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddExamPackReviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExamPackReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
