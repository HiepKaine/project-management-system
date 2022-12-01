import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteSelectControlComponent } from './remote-select-control.component';

describe('RemoteSelectControlComponent', () => {
  let component: RemoteSelectControlComponent;
  let fixture: ComponentFixture<RemoteSelectControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoteSelectControlComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteSelectControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
