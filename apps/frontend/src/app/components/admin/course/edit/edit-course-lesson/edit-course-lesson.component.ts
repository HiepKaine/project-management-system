import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '@frontend/models/course.model';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CourseService } from '../../course.service';
import { ApiItemResponse } from '@frontend/common';
import { plainToInstance } from 'class-transformer';
import { AddChapterModalComponent } from '../add-chapter-modal/add-chapter-modal.component';
import { CourseChapter } from '@frontend/models/course-chapter.model';
import { AddLessonModalComponent } from '../add-lesson-modal/add-lesson-modal.component';
import { Lesson } from '@frontend/models/lesson.model';

@UntilDestroy()
@Component({
  selector: 'app-edit-course-lesson',
  templateUrl: './edit-course-lesson.component.html',
  styleUrls: ['./edit-course-lesson.component.scss'],
})
export class EditCourseLessonComponent implements OnInit {
  public courseId!: number;
  public course!: Course;
  constructor(
    private ngxFormManager: NgxFormManager,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.activatedRoute.parent?.params.subscribe((param) => {
      this.courseId = Number(param['courseId']);
    })
  }

  private getCourse(courseId: number) {
    this.courseService.show(courseId)
      .pipe(untilDestroyed(this))
      .subscribe((result: ApiItemResponse<Course>) => {
        this.course = plainToInstance(Course, result.data);
      });
  }
  ngOnInit(): void {
    this.getCourse(this.courseId);
  }

  openAddChapterModal() {
    const modal = this.modal.create({
      nzTitle: 'Thêm bài giảng',
      nzContent: AddChapterModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {},
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          this.courseService.addChapter(this.courseId, { name: form.get('name')?.value }).subscribe(() => {
            this.notificationService.success(this.translate.instant('success.title'), this.translate.instant('success.create'), { nzDuration: 3000 });
            this.getCourse(this.courseId);
            modal.destroy();
          })
        }
        return false;
      },
    });
  }

  deleteChapter(item: CourseChapter): void {
    this.modal.warning({
      nzTitle: 'Xoá chương',
      nzContent: `Bạn đang xoá trắc nghiệm nổi bật ${item.name}`,
      nzOnOk: () => {
        this.courseService.removeChapter(this.courseId, item.id)
          .subscribe(() => {
            this.getCourse(this.courseId);
            this.notificationService.success(this.translate.instant('success.title'), this.translate.instant('success.delete'), { nzDuration: 3000 })
          })
      }
    });
  }

  openAddLessonModal(chapter: CourseChapter) {
    const modal = this.modal.create({
      nzTitle: 'Thêm bài giảng',
      nzContent: AddLessonModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {},
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const lessonId = form.get('lesson')?.value?.id;
          if (lessonId) {
            this.courseService.addLesson(this.courseId, chapter.id, lessonId).subscribe(() => {
              this.notificationService.success(this.translate.instant('success.title'), this.translate.instant('success.create'), { nzDuration: 3000 });
              this.getCourse(this.courseId);
              modal.destroy();
            })
          } else {
            this.notificationService.success(this.translate.instant('error.title'), 'Vui lòng chọn bài giảng và thử lại', { nzDuration: 3000 });
          }
        }
        return false;
      },
    });
  }

  removeLesson(chapter: CourseChapter, lesson: Lesson): void {
    this.modal.warning({
      nzTitle: 'Xoá bài giảng',
      nzContent: `Bạn đang xoá bài giảng ${lesson.name}`,
      nzOnOk: () => {
        this.courseService.removeLesson(this.courseId, chapter.id, lesson.id)
          .subscribe(() => {
            this.getCourse(this.courseId);
            this.notificationService.success(this.translate.instant('success.title'), this.translate.instant('success.delete'), { nzDuration: 3000 })
          })
      }
    });
  }
}
