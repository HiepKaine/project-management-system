import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingQuestionComponent } from './reading-question.component';

describe('ReadingQuestionComponent', () => {
  let component: ReadingQuestionComponent;
  let fixture: ComponentFixture<ReadingQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadingQuestionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
