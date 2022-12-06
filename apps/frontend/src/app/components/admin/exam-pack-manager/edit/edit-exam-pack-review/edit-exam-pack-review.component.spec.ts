import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExamPackReviewComponent } from './edit-exam-pack-review.component';

describe('EditExamPackReviewComponent', () => {
  let component: EditExamPackReviewComponent;
  let fixture: ComponentFixture<EditExamPackReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditExamPackReviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExamPackReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
