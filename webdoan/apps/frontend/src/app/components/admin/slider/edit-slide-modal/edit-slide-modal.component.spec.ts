import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSlideModalComponent } from './edit-slide-modal.component';

describe('EditSlideModalComponent', () => {
  let component: EditSlideModalComponent;
  let fixture: ComponentFixture<EditSlideModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSlideModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSlideModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
