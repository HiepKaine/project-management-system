import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseRelatedComponent } from './edit-course-related.component';

describe('EditCourseRelatedComponent', () => {
  let component: EditCourseRelatedComponent;
  let fixture: ComponentFixture<EditCourseRelatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCourseRelatedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
