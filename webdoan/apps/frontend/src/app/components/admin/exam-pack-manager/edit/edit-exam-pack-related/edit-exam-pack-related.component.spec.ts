import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExamPackRelatedComponent } from './edit-exam-pack-related.component';

describe('EditExamPackRelatedComponent', () => {
  let component: EditExamPackRelatedComponent;
  let fixture: ComponentFixture<EditExamPackRelatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditExamPackRelatedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExamPackRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
