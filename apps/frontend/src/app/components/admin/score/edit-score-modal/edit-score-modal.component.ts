import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Score } from '@frontend/models/score.model';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { SelectControlComponent, TextControlComponent } from '@webpress/form';

@Component({
  selector: 'app-edit-score-modal',
  templateUrl: './edit-score-modal.component.html',
  styleUrls: ['./edit-score-modal.component.scss'],
})
export class EditScoreModalComponent implements OnInit {
  @Input() score!: Score;
  public form: UntypedFormGroup = this.fb.group({
    studentId: new UntypedFormControl('', [Validators.required]),
    subjectId: new UntypedFormControl('', [Validators.required]),
    score: new UntypedFormControl('', [Validators.required]),
  });

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;
  
  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager
  ) {}

  ngOnInit(): void {
    this.form.setValue({
      studentId: this.score.studentId,
      subjectId: this.score.subjectId,
      score: this.score.score,
    });

    const ngxform = this.ngxFormManager.init(this.form, {
      studentId: {
        component: SelectControlComponent,
        option: {
          nzSize: 'large',
          label: 'Sinh viên',
          nzOption: [],
        },
      },

      subjectId: {
        component: SelectControlComponent,
        option: {
          nzSize: 'large',
          label: 'Môn',
          nzOption: [],
        },
      },

      score: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          label: 'Điểm',
          className: ['col-12', 'p-1'],
        },
      },
    });

    this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
  }
}
