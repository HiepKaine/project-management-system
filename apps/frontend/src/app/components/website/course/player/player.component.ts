import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCollectionResponse, ApiItemResponse } from '@frontend/common';
import { CompletedLesson } from '@frontend/models/completed-lesson.model';
import { CourseChapter } from '@frontend/models/course-chapter.model';
import { Course } from '@frontend/models/course.model';
import { Lesson } from '@frontend/models/lesson.model';
import { User } from '@frontend/models/user.model';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@shared/components/notification/notification.service';
import { plainToInstance } from 'class-transformer';
import { findIndex, flatMap } from 'lodash-es';
import { filter, forkJoin, of, OperatorFunction, switchMap, BehaviorSubject } from 'rxjs';
import { CourseService } from '../course.service';

@UntilDestroy()
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  public profile: User | null = null;
  public isBoughtCourse = false;
  public courseId!: number;
  public lessonId!: number | null;
  public course!: Course;
  public lessons: Lesson[] = [];
  public activatedLesson!: Lesson;
  public activeLesson$: BehaviorSubject<Lesson | null> = new BehaviorSubject<Lesson | null>(null);
  public lessonCount!: number;
  public completedLessons: CompletedLesson[] = [];

  constructor(
    private courseSerive: CourseService,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(({ id, lessonId }) => {
      this.lessonId = lessonId && Number(lessonId) > 0 ? Number(lessonId) : null;
      this.courseId = Number(id);
      this.getCourseDetail(this.courseId);
      this.courseSerive.checkCompletedStatusOfCourse(id)
        .pipe(untilDestroyed(this))
        .subscribe((result: ApiCollectionResponse<CompletedLesson>) => {
          this.completedLessons = result.data.map(item => plainToInstance(CompletedLesson, item));
        });
      this.store.select(ShellSelectors.getShellProfile)
        .pipe(
          filter((user: User | undefined) => user !== undefined) as OperatorFunction<User | undefined, User>,
          switchMap((user: User) => forkJoin([of(user), this.courseSerive.userBoughtCourse(this.courseId)]))
        )
        .subscribe(([user, isBoughtCourse]) => {
          if (user) this.profile = user;
          if (isBoughtCourse) {
            this.isBoughtCourse = isBoughtCourse;
          } else {
            this.notificationService.error(this.translate.instant('error.title'), 'Bạn không thể học khoá học này, vui lòng liên hệ với quản trị viên', { nzDuration: 5000 });
            this.router.navigate(['/']);
          }
        })
    })
    this.activeLesson$.pipe(
      untilDestroyed(this),
      filter((lesson: Lesson | null) => lesson !== null) as OperatorFunction<Lesson | null, Lesson>,
    )
      .subscribe((lesson: Lesson) => {
        this.activatedLesson = lesson;
      })
  }

  private getCourseDetail(id: number) {
    this.courseSerive.show(id).subscribe((result: ApiItemResponse<Course>) => {
      this.course = plainToInstance(Course, result.data);
      this.lessonCount = this.course.getLessonCount();
      if (this.course && Array.isArray(this.course.courseChapters)) {
        this.lessons = flatMap(this.course.courseChapters, item => item.lessons);
        const lesson = this.lessons.find(i => i.id === this.lessonId);
        if (lesson) {
          this.activeLesson$.next(lesson);
        } else {
          this.activeLesson$.next(this.lessons[0]);
        }
      } else {
        this.lessons = [];
      }
    });
  }

  play(lesson: Lesson) {
    this.activeLesson$.next(lesson);
  }

  isActiveChapter(chapter: CourseChapter): boolean {
    return this.activatedLesson && chapter.lessons.find(item => item.id === this.activatedLesson.id) !== undefined;
  }

  complete(lesson: Lesson) {
    const chapter = this.course.courseChapters.find(item => item.lessons.find(i => i.id === lesson.id) !== undefined);
    if (chapter) {
      this.courseSerive.completedLesson(chapter.id, lesson.id)
        .pipe(untilDestroyed(this))
        .subscribe((result: ApiItemResponse<CompletedLesson>) => {
          this.completedLessons.push(plainToInstance(CompletedLesson, result.data));
          console.log(this.completedLessons);
        });
    }

  }

  next(): void {
    const currentLessonIndex = findIndex(this.lessons, i => i.id === this.activatedLesson.id);
    if (currentLessonIndex < this.lessons.length - 1) {
      const nextLesson = this.lessons[currentLessonIndex + 1];
      this.router.navigate([nextLesson.id], { relativeTo: this.activatedRoute.parent });
    }
  }

  prev(): void {
    const currentLessonIndex = findIndex(this.lessons, i => i.id === this.activatedLesson.id);
    if (currentLessonIndex > 0) {
      const nextLesson = this.lessons[currentLessonIndex - 1];
      this.router.navigate([nextLesson.id], { relativeTo: this.activatedRoute.parent });
    }
  }
}
