import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseHighlightComponent } from './edit-course-highlight.component';

describe('EditCourseHighlightComponent', () => {
  let component: EditCourseHighlightComponent;
  let fixture: ComponentFixture<EditCourseHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCourseHighlightComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
