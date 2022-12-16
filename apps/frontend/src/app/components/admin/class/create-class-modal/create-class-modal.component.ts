import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { TextControlComponent } from '@webpress/form';

@Component({
  selector: 'app-create-class-modal',
  templateUrl: './create-class-modal.component.html',
  styleUrls: ['./create-class-modal.component.scss'],
})
export class CreateClassModalComponent implements OnInit {
  public form: UntypedFormGroup = this.fb.group({
    name: new UntypedFormControl('', [Validators.required]),
    classCode: new UntypedFormControl('', [Validators.required]),
  });

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  constructor(
    private fb: FormBuilder,
    private ngxFormManager: NgxFormManager
  ) {}

  ngOnInit(): void {
    const ngxform = this.ngxFormManager.init(this.form, {
      classCode: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Mã lớp',
          className: ['col-12', 'p-1'],
        },
      },
      name: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Tên khoa',
          className: ['col-12', 'p-1'],
        },
      },
    });
    this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
  }
}
