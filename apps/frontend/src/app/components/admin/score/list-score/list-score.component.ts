import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Score } from '@frontend/models/score.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { pageParser } from 'apps/frontend/src/app/@core/utils/query-parser';
import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateScoreModalComponent } from '../create-score-modal/create-score-modal.component';
import { EditScoreModalComponent } from '../edit-score-modal/edit-score-modal.component';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-list-score',
  templateUrl: './list-score.component.html',
  styleUrls: ['./list-score.component.scss'],
})
@UntilDestroy()
export class ListScoreComponent {
  public scores: Score[] = [];
  public keyword!: string;
  public pagination!: ApiResponsePagination;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService,
    private router: Router,
    private viewcontainerRef: ViewContainerRef,
    private ngxFormManager: NgxFormManager,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private scoreService: ScoreService
  ) {
    this.activatedRoute.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((data: Params) => {
        const page = pageParser(data['page']);
        const keyword = data['keyword'] ?? '';
        this.getScore({ page, keyword });
      });
  }

  getScore(param?: { page?: number; keyword?: string }) {
    this.scoreService
      .get(param ?? {})
      .subscribe((result: ApiPaginateResponse<Score>) => {
        this.scores = plainToInstance(Score, result.data);
        this.pagination = result.meta.pagination;
      });
  }

  createScoreModal() {
    const modal = this.modal.create({
      nzTitle: 'Thêm điểm mới',
      nzContent: CreateScoreModalComponent,
      nzViewContainerRef: this.viewcontainerRef,
      nzComponentParams: {},
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const data = {
            studentId: form.get('studentId')?.value,
            subjectId: form.get('subjectId')?.value,
            score: form.get('score')?.value,
          };

          this.scoreService.create(data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );

            modal.destroy();
            this.getScore();
          });
        }
        return false;
      },
    });
  }

  editScoreModal(item: Score) {
    const modal = this.modal.create({
      nzTitle: 'Cập nhật điểm',
      nzContent: EditScoreModalComponent,
      nzViewContainerRef: this.viewcontainerRef,
      nzComponentParams: {
        score: item,
      },
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const data = {
            studentId: form.get('studentId')?.value,
            subjectId: form.get('subjectId')?.value,
            score: form.get('score')?.value,
          };

          this.scoreService.update(item.id, data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );

            modal.destroy();
            this.getScore();
          });
        }
        return false;
      },
    });
  }

  deleteItem(item: Score) {
    this.modal.warning({
      nzTitle: 'Xóa bộ môn',
      nzContent: `Bạn có chắc chắn muốn xóa điểm của sinh viên <b>${item.studentId}</b> này không?`,
      nzOnOk: () => {
        this.scoreService.delete(item.id).subscribe(() => {
          this.notificationService.success(
            this.translate.instant('success.title'),
            this.translate.instant('success.delete'),
            { nzDuration: 3000 }
          );
        });
        this.getScore();
      },
    });
  }
  search() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        keyword: this.keyword ?? '',
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  gotoPage(page: number) {
    this.router.navigate([], {
      queryParams: { page },
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
    });
  }
}
