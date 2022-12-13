import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Faculty } from '@frontend/models/faculty.model';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { TextControlComponent } from '@webpress/form';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @Input() faculty!: Faculty;

  public form: UntypedFormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    facultyCode: new FormControl('', [Validators.required]),
  });

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;
  constructor(
    private fb: FormBuilder,
    private ngxFormManager: NgxFormManager
  ) {}

  ngOnInit(): void {
    this.form.setValue({
      name: this.faculty.name,
      facultyCode: this.faculty.facultyCode,
    });

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
