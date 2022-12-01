import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExamPackComponent } from './user-exam-pack.component';

describe('UserExamPackComponent', () => {
  let component: UserExamPackComponent;
  let fixture: ComponentFixture<UserExamPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserExamPackComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserExamPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
