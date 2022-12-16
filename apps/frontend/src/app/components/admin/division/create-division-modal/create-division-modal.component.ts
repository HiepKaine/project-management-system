import { Component, ViewChild, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { TextControlComponent } from '@webpress/form';

@Component({
  selector: 'app-create-division-modal',
  templateUrl: './create-division-modal.component.html',
  styleUrls: ['./create-division-modal.component.scss'],
})
export class CreateDivisionModalComponent implements OnInit {
  public form: UntypedFormGroup = this.fb.group({
    name: new UntypedFormControl('', [Validators.required]),
    divisionCode: new UntypedFormControl('', [Validators.required]),
  });

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager
  ) {}

  ngOnInit(): void {
    const ngxform = this.ngxFormManager.init(this.form, {
      name: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Mã bộ môn',
          className: ['col-12', 'p-1'],
        },
      },

      divisionCode: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Tên bộ môn',
          className: ['col-12', 'p-1'],
        },
      },
    });

    this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
  }
}
