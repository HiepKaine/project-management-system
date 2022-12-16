import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClassModalComponent } from './edit-class-modal.component';

describe('EditClassModalComponent', () => {
  let component: EditClassModalComponent;
  let fixture: ComponentFixture<EditClassModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditClassModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditClassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
