import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { TextControlComponent } from '@webpress/form';

@Component({
  selector: 'app-create-faculty-modal',
  templateUrl: './create-faculty-modal.component.html',
  styleUrls: ['./create-faculty-modal.component.scss'],
})
export class CreateFacultyModalComponent implements OnInit {
  public form: UntypedFormGroup = this.fb.group({
    name: new UntypedFormControl('', [Validators.required]),
    facultyCode: new UntypedFormControl('', [Validators.required]),
  });

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager
  ) {}

  ngOnInit(): void {
    const ngxform = this.ngxFormManager.init(this.form, {
      facultyCode: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Mã khoa',
          className: ['col-12', 'p-1'],
        },
      },
      name: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          label: 'Tên khoa',
          className: ['col-12', 'p-1'],
        },
      },
    });

    this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
  }
}
