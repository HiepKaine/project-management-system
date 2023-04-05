import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { ApiCollectionResponse } from '@frontend/common';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { RemoteSelectControlComponent } from '@webpress/form';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { ExamPackManagerService } from '../../exam-pack-manager.service';

@Component({
  selector: 'app-add-exam-modal',
  templateUrl: './add-exam-modal.component.html',
  styleUrls: ['./add-exam-modal.component.scss'],
})
export class AddExamModalComponent {
  public form = this.fb.group({
    exam: new UntypedFormControl(null, [Validators.required])
  })

  @ViewChild('formInputs', { static: true }) formInputs!: NgxFormrAnchorComponent;
  private exam$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager,
    private examPackManagerService: ExamPackManagerService
  ) { }

  // ngOnInit(): void {
  //   const ngxForm = this.ngxFormManager.init(this.form, {
  //     exam: {
  //       component: RemoteSelectControlComponent,
  //       option: {
  //         label: 'Đề thi',
  //         showSearch: true,
  //         allowClear: true,
  //         nzSize: 'large',
  //         type: 'text',
  //         className: ['col-12', 'p-1'],
  //         nzOptions: this.exam$
  //           .pipe(
  //             debounceTime(500),
  //             distinctUntilChanged(),
  //             switchMap((keyword: string) => this.examPackManagerService.getExam({ keyword })),
  //             map((result: ApiCollectionResponse<Exam>) => result.data.map(i => ({ label: i.name, value: i })))
  //           ),
  //         onSearch: (val: string) => {
  //           this.exam$.next(val);
  //         }
  //       },
  //     }
  //   })
  //   this.ngxFormManager.render(ngxForm, this.formInputs.viewContainerRef)
  // }
}
