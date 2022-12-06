import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReadingContentQuestionModalComponent } from './create-reading-content-question-modal.component';

describe('CreateReadingContentQuestionModalComponent', () => {
  let component: CreateReadingContentQuestionModalComponent;
  let fixture: ComponentFixture<CreateReadingContentQuestionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateReadingContentQuestionModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CreateReadingContentQuestionModalComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
