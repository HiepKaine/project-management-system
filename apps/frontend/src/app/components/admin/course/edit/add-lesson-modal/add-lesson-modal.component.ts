import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { ApiCollectionResponse } from '@frontend/common';
import { ExamPack } from '@frontend/models/exam-pack.model';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { RemoteSelectControlComponent } from '@webpress/form';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { CourseService } from '../../course.service';

@Component({
  selector: 'app-add-lesson-modal',
  templateUrl: './add-lesson-modal.component.html',
  styleUrls: ['./add-lesson-modal.component.scss'],
})
export class AddLessonModalComponent implements OnInit {
  public form = this.fb.group({
    lesson: new UntypedFormControl(null, [Validators.required])
  })

  @ViewChild('formInputs', { static: true }) formInputs!: NgxFormrAnchorComponent;
  private lesson$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    const ngxForm = this.ngxFormManager.init(this.form, {
      lesson: {
        component: RemoteSelectControlComponent,
        option: {
          label: 'Bài giảng',
          showSearch: true,
          allowClear: true,
          nzSize: 'large',
          type: 'text',
          className: ['col-12', 'p-1'],
          nzOptions: this.lesson$
            .pipe(
              debounceTime(500),
              distinctUntilChanged(),
              switchMap((keyword: string) => this.courseService.getLesson({ keyword })),
              map((result: ApiCollectionResponse<ExamPack>) => result.data.map(i => ({ label: i.name, value: i })))
            ),
          onSearch: (val: string) => {
            this.lesson$.next(val);
          }
        },
      }
    })
    this.ngxFormManager.render(ngxForm, this.formInputs.viewContainerRef)
  }
}
