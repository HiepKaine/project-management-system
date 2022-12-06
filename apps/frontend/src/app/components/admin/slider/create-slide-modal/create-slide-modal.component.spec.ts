import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSlideModalComponent } from './create-slide-modal.component';

describe('CreateSlideModalComponent', () => {
  let component: CreateSlideModalComponent;
  let fixture: ComponentFixture<CreateSlideModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSlideModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSlideModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
