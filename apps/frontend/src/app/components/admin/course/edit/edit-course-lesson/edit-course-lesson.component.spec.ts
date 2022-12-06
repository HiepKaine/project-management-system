import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseLessonComponent } from './edit-course-lesson.component';

describe('EditCourseLessonComponent', () => {
  let component: EditCourseLessonComponent;
  let fixture: ComponentFixture<EditCourseLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCourseLessonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
