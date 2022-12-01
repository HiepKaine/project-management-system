import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserExamPackModalComponent } from './add-user-exam-pack-modal.component';

describe('AddUserExamPackModalComponent', () => {
  let component: AddUserExamPackModalComponent;
  let fixture: ComponentFixture<AddUserExamPackModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserExamPackModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserExamPackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
