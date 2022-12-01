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
import { ExamPackManagerService } from '../../exam-pack-manager.service';

@UntilDestroy()
@Component({
  selector: 'app-edit-exam-pack-highlight',
  templateUrl: './edit-exam-pack-highlight.component.html',
  styleUrls: ['./edit-exam-pack-highlight.component.scss'],
})
export class EditExamPackHighlightComponent implements OnInit {
  public form: UntypedFormGroup = this.fb.group({
    highlight: new UntypedFormControl(null),
  });
  public examPackId!: number;
  public examPack!: ExamPack;
  public highlighCourses: Course[] = [];

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  private highlight$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager,
    private examPackManagerService: ExamPackManagerService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private modal: NzModalService
  ) {
    this.activatedRoute.parent?.params.subscribe((param) => {
      this.examPackId = Number(param['id']);
    });
  }

  private getHighlight(examPackId: number) {
    this.examPackManagerService
      .getHighlight(examPackId)
      .pipe(untilDestroyed(this))
      .subscribe((result: ApiCollectionResponse<Course>) => {
        this.highlighCourses = result.data.map((item) =>
          plainToInstance(Course, item)
        );
      });
  }

  ngOnInit(): void {
    this.getHighlight(this.examPackId);
    this.examPackManagerService
      .show(this.examPackId)
      .pipe(untilDestroyed(this))
      .subscribe((result: ApiItemResponse<ExamPack>) => {
        this.examPack = plainToInstance(ExamPack, result.data);
      });
    const ngxform = this.ngxFormManager.init(this.form, {
      highlight: {
        component: RemoteSelectControlComponent,
        option: {
          showSearch: true,
          allowClear: true,
          nzSize: 'large',
          type: 'text',
          className: ['col-12', 'p-1'],
          nzOptions: this.highlight$.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap((keyword: string) =>
              this.examPackManagerService.getActiveCourse({ keyword })
            ),
            map((result: ApiCollectionResponse<Course>) =>
              result.data.map((i) => ({ label: i.name, value: i }))
            )
          ),
          onSearch: (val: string) => {
            this.highlight$.next(val);
          },
        },
      },
    });
    this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
  }

  addHighlight() {
    const course = this.form.get('highlight')?.value;
    if (!course) {
      this.notificationService.error(
        this.translate.instant('error.title'),
        'Vui lòng chọn gói trắc nghiệm',
        { nzDuration: 3000 }
      );
    } else if (this.highlighCourses.find((item) => item.id === course.id)) {
      this.notificationService.error(
        this.translate.instant('error.title'),
        'Gói trắc nghiệm đã được thêm',
        { nzDuration: 3000 }
      );
    } else {
      this.examPackManagerService
        .addHighlight(this.examPackId, course.id)
        .subscribe(() => {
          this.form.setValue({ highlight: null });
          this.getHighlight(this.examPackId);
          this.notificationService.success(
            this.translate.instant('success.title'),
            this.translate.instant('success.create'),
            { nzDuration: 3000 }
          );
        });
    }
  }

  removeHighlight(item: Course): void {
    this.modal.warning({
      nzTitle: 'Xoá trắc bài giảng nổi bật',
      nzContent: `Bạn đang xoá trắc bài giảng nổi bật ${item.name}`,
      nzOnOk: () => {
        this.examPackManagerService
          .removeHighlight(this.examPackId, item.id)
          .subscribe(() => {
            this.getHighlight(this.examPackId);
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
