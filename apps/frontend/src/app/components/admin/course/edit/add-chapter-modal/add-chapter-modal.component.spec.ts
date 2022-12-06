import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChapterModalComponent } from './add-chapter-modal.component';

describe('AddChapterModalComponent', () => {
  let component: AddChapterModalComponent;
  let fixture: ComponentFixture<AddChapterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddChapterModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChapterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
