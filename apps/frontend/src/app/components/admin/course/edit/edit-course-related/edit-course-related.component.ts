import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  ApiCollectionResponse,
  ApiItemResponse,
  ApiPaginateResponse,
} from '@frontend/common';
import { Course } from '@frontend/models/course.model';
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
  selector: 'app-edit-course-related',
  templateUrl: './edit-course-related.component.html',
  styleUrls: ['./edit-course-related.component.scss'],
})
export class EditCourseRelatedComponent implements OnInit {
  public form: UntypedFormGroup = this.fb.group({
    relatedCourse: new UntypedFormControl(null),
  });
  public courseId!: number;
  public course!: Course;
  public relatedCourses: Course[] = [];

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  private relatedCourse$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

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

  private getRelated(courseId: number) {
    this.courseService
      .getRelated(courseId)
      .pipe(untilDestroyed(this))
      .subscribe((result: ApiCollectionResponse<Course>) => {
        this.relatedCourses = result.data.map((item) =>
          plainToInstance(Course, item)
        );
      });
  }

  ngOnInit(): void {
    this.getRelated(this.courseId);
    this.courseService
      .show(this.courseId)
      .pipe(untilDestroyed(this))
      .subscribe((result: ApiItemResponse<Course>) => {
        this.course = plainToInstance(Course, result.data);
      });

    const ngxform = this.ngxFormManager.init(this.form, {
      relatedCourse: {
        component: RemoteSelectControlComponent,
        option: {
          showSearch: true,
          allowClear: true,
          nzSize: 'large',
          type: 'text',
          className: ['col-12', 'p-1'],
          nzOptions: this.relatedCourse$.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap((keyword: string) =>
              this.courseService.getActiveCourse({ keyword })
            ),
            map((result: ApiPaginateResponse<Course>) =>
              result.data.map((item) => ({ label: item.name, value: item }))
            )
          ),
          onSearch: (val: string) => {
            this.relatedCourse$.next(val);
          },
        },
      },
    });

    this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
  }

  addRelated() {
    const course = this.form.get('relatedCourse')?.value;
    if (!course) {
      this.notificationService.error(
        this.translate.instant('error.title'),
        'vui lòng chọn khóa học',
        { nzDuration: 3000 }
      );
    } else if (this.relatedCourses.find((item) => item.id === course.id)) {
      this.notificationService.error(
        this.translate.instant('error.title'),
        'Khóa học đã được thêm',
        { nzDuration: 3000 }
      );
    } else {
      this.courseService.addRelated(this.courseId, course.id).subscribe(() => {
        this.form.setValue({ relatedCourse: null });
        this.getRelated(this.courseId);
        this.notificationService.success(
          this.translate.instant('success.title'),
          this.translate.instant('success.create'),
          { nzDuration: 3000 }
        );
      });
    }
  }

  removeRelated(item: Course) {
    this.modal.warning({
      nzTitle: 'Xóa khóa học liên quan',
      nzContent: `Bạn đang xóa khóa học liên quan ${item.name}`,
      nzOnOk: () => {
        this.courseService
          .removeRelated(this.courseId, item.id)
          .subscribe(() => {
            this.getRelated(this.courseId);
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
