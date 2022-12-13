import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Classes } from '@frontend/models/class.model';
import {
  FormBuilder,
  NgxFormManager,
  NgxFormrAnchorComponent,
} from '@ngxform/platform';
import { TextControlComponent } from '@webpress/form';

@Component({
  selector: 'app-edit-class-modal',
  templateUrl: './edit-class-modal.component.html',
  styleUrls: ['./edit-class-modal.component.scss'],
})
export class EditClassModalComponent implements OnInit {
  @Input() class!: Classes;

  form: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    classCode: new FormControl('', [Validators.required]),
  });

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  constructor(
    private fb: FormBuilder,
    private ngxFormManager: NgxFormManager
  ) {}

  ngOnInit(): void {
    this.form.setValue({
      name: this.class.name,
      classCode: this.class.classCode,
    });

    const ngxform = this.ngxFormManager.init(this.form, {
      classCode: {
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
