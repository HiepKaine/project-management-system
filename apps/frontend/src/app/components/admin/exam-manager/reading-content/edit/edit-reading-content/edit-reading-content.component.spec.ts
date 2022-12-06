import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReadingContentComponent } from './edit-reading-content.component';

describe('EditReadingContentComponent', () => {
  let component: EditReadingContentComponent;
  let fixture: ComponentFixture<EditReadingContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditReadingContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReadingContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
