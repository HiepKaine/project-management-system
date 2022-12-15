import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Division } from '@frontend/models/division.model';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { TextControlComponent } from '@webpress/form';

@Component({
  selector: 'app-edit-division-modal',
  templateUrl: './edit-division-modal.component.html',
  styleUrls: ['./edit-division-modal.component.scss'],
})
export class EditDivisionModalComponent implements OnInit {
  @Input() division!: Division;

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
    this.form.setValue({
      name: this.division.name,
      divisionCode: this.division.divisionCode,
    });

    const ngxform = this.ngxFormManager.init(this.form, {
      divisionCode: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Mã bộ môn',
          className: ['col-12', 'p-1'],
        },
      },

      name: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          label: 'Tên bộ môn',
          className: ['col-12', 'p-1'],
        },
      },
    });

    this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
  }
}
