import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamResultFlatComponent } from './exam-result-flat.component';

describe('ExamResultFlatComponent', () => {
  let component: ExamResultFlatComponent;
  let fixture: ComponentFixture<ExamResultFlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamResultFlatComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamResultFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
