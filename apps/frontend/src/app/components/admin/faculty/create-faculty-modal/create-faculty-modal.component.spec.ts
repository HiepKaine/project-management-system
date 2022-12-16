import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFacultyModalComponent } from './create-faculty-modal.component';

describe('CreateFacultyModalComponent', () => {
  let component: CreateFacultyModalComponent;
  let fixture: ComponentFixture<CreateFacultyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateFacultyModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFacultyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
