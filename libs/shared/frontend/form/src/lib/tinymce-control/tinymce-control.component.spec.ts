import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinymceControlComponent } from './tinymce-control.component';

describe('TinymceControlComponent', () => {
  let component: TinymceControlComponent;
  let fixture: ComponentFixture<TinymceControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TinymceControlComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinymceControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
