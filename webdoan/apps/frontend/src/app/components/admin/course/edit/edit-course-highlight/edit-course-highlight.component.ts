import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiCollectionResponse, ApiItemResponse } from '@frontend/common';
import { Course } from '@frontend/models/course.model';
import { ExamPack } from '@frontend/models/exam-pack.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { RemoteSelectControlComponent } from '@webpress/form';
import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs';
import { CourseService } from '../../course.service';

@UntilDestroy()
@Component({
  selector: 'app-edit-course-highlight',
  templateUrl: './edit-course-highlight.component.html',
  styleUrls: ['./edit-course-highlight.component.scss'],
})
export class EditCourseHighlightComponent implements OnInit {
  public form: UntypedFormGroup = this.fb.group({
    highlightExamPack: new UntypedFormControl(null),
  });
  public courseId!: number;
  public course!: Course;
  public highlighExamPacks: ExamPack[] = [];

  @ViewChild('formHighlightExamPackInputs', { static: true })
  formHighlightExamPackInputs!: NgxFormrAnchorComponent;

  private highlightExamPack$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private modal: NzModalService
  ) {
    this.activatedRoute.parent?.params.subscribe((param) => {
      this.courseId = Number(param['courseId']);
    });
  }

  private getHighlight(courseId: number) {
    this.courseService
      .getHighlightExamPacks(courseId)
      .pipe(untilDestroyed(this))
      .subscribe((result: ApiCollectionResponse<ExamPack>) => {
        this.highlighExamPacks = result.data.map((item) =>
          plainToInstance(ExamPack, item)
        );
      });
  }

  ngOnInit(): void {
    this.getHighlight(this.courseId);
    this.courseService
      .show(this.courseId)
      .pipe(untilDestroyed(this))
      .subscribe((result: ApiItemResponse<Course>) => {
        this.course = plainToInstance(Course, result.data);
      });
    const ngxform = this.ngxFormManager.init(this.form, {
      highlightExamPack: {
        component: RemoteSelectControlComponent,
        option: {
          showSearch: true,
          allowClear: true,
          nzSize: 'large',
          type: 'text',
          className: ['col-12', 'p-1'],
          nzOptions: this.highlightExamPack$.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap((keyword: string) =>
              this.courseService.getActiveExamPack({ keyword })
            ),
            map((result: ApiCollectionResponse<ExamPack>) =>
              result.data.map((i) => ({ label: i.name, value: i }))
            )
          ),
          onSearch: (val: string) => {
            this.highlightExamPack$.next(val);
          },
        },
      },
    });
    this.ngxFormManager.render(
      ngxform,
      this.formHighlightExamPackInputs.viewContainerRef,
      ['highlightExamPack']
    );
  }

  addHighlight() {
    const examPack = this.form.get('highlightExamPack')?.value;
    if (!examPack) {
      this.notificationService.error(
        this.translate.instant('error.title'),
        'Vui lòng chọn gói trắc nghiệm',
        { nzDuration: 3000 }
      );
    } else if (this.highlighExamPacks.find((item) => item.id === examPack.id)) {
      this.notificationService.error(
        this.translate.instant('error.title'),
        'Gói trắc nghiệm đã được thêm',
        { nzDuration: 3000 }
      );
    } else {
      this.courseService
        .addHighlight(this.courseId, examPack.id)
        .subscribe(() => {
          this.form.setValue({ highlightExamPack: null });
          this.getHighlight(this.courseId);
          this.notificationService.success(
            this.translate.instant('success.title'),
            this.translate.instant('success.create'),
            { nzDuration: 3000 }
          );
        });
    }
  }

  removeHighlight(item: ExamPack): void {
    this.modal.warning({
      nzTitle: 'Xoá trắc nghiệm nổi bật',
      nzContent: `Bạn đang xoá trắc nghiệm nổi bật ${item.name}`,
      nzOnOk: () => {
        this.courseService
          .removeHighlight(this.courseId, item.id)
          .subscribe(() => {
            this.getHighlight(this.courseId);
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.delete'),
              { nzDuration: 3000 }
            );
          });
      },
    });
  }
}
