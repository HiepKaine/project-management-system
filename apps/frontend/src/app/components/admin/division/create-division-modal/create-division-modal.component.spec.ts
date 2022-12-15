import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDivisionModalComponent } from './create-division-modal.component';

describe('CreateDivisionModalComponent', () => {
  let component: CreateDivisionModalComponent;
  let fixture: ComponentFixture<CreateDivisionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDivisionModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDivisionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
