import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDivisionModalComponent } from './edit-division-modal.component';

describe('EditDivisionModalComponent', () => {
  let component: EditDivisionModalComponent;
  let fixture: ComponentFixture<EditDivisionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditDivisionModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditDivisionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
