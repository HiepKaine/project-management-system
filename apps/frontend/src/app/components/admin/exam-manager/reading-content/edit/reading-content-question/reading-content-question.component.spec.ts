import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingContentQuestionComponent } from './reading-content-question.component';

describe('ReadingContentQuestionComponent', () => {
  let component: ReadingContentQuestionComponent;
  let fixture: ComponentFixture<ReadingContentQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadingContentQuestionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingContentQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
