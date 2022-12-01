import { CreateReadingContentQuestionModalComponent } from './../create-reading-content-question-modal/create-reading-content-question-modal.component';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { plainToInstance } from 'class-transformer';

import { ApiItemResponse } from '@frontend/common';
import { CreateQuestionDto, Question } from '@frontend/models/question.model';
import { UntilDestroy } from '@ngneat/until-destroy';

import { Dictionary } from '@frontend/models/dictionary.model';
import { ReadingContent } from '@frontend/models/reading-content.model';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { QuestionService } from '../../../service/question.service';
import { ReadingContentService } from '../../../service/reading-content.service';
import { EditReadingContentQuestionModalComponent } from '../edit-reading-content-question-modal/edit-reading-content-question-modal.component';

@UntilDestroy()
@Component({
  selector: 'app-reading-content-question',
  templateUrl: './reading-content-question.component.html',
  styleUrls: ['./reading-content-question.component.scss'],
})
export class ReadingContentQuestionComponent implements OnInit {
  public readingContentId!: number;
  public readingContent!: ReadingContent;
  public questions: Question[] = [];
  public dictionary!: Dictionary;

  constructor(
    private questionService: QuestionService,
    private viewContainerRef: ViewContainerRef,
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private ngxFormManager: NgxFormManager,
    private readingContentService: ReadingContentService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.readingContentId = Number(this.activatedRoute.parent?.snapshot.params['readingContentId']);
    this.getData(this.readingContentId)
  }

  getData(readingContentId: number) {
    this.readingContentService.show(readingContentId)
      .subscribe((result: ApiItemResponse<ReadingContent>) => {
        this.readingContent = plainToInstance(ReadingContent, result.data);
      })
  }

  deleteItem(item: Question) {
    this.modal.warning({
      nzTitle: 'Xoá câu hỏi trắc nghiệm',
      nzContent: `Bạn đang xoá câu hỏi trắc nghiệm ${item.question}`,
      nzOnOk: () => {
        this.questionService.delete(item.id).subscribe(() => {
          this.notificationService.success(
            this.translate.instant('success.title'),
            this.translate.instant('success.delete'),
            { nzDuration: 3000 }
          );
          this.getData(this.readingContentId)
        });
      },
    });
  }

  openCreateQuestionModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Thêm câu hỏi',
      nzContent: CreateReadingContentQuestionModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: 800,
      nzComponentParams: {},
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const data: CreateQuestionDto = {
            question: form.get('question')?.value,
            note: form.get('note')?.value,
            categoryId: this.readingContent.categoryId,
            readingContentId: this.readingContentId,
            answers: form.get('answers')?.value.map((answer: string, index: number) => ({
              answer,
              isCorrect: index === form.get('correctAnswer')?.value
            }))
          }
          this.questionService.create<CreateQuestionDto>(data)
            .subscribe(() => {
              this.notificationService.success('Tạo câu hỏi thành công', 'Thành công', { nzDuration: 3000 });
              this.getData(this.readingContentId)
            })
          this.modal.closeAll();
        }
        return false;
      },
    });
  }

  openEditReadingContentQuestionModal(item: Question): void {
    const modal = this.modal.create({
      nzTitle: 'Sửa câu hỏi',
      nzContent: EditReadingContentQuestionModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: 800,
      nzComponentParams: {
        question: item
      },
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const data = {
            question: form.get('question')?.value,
            note: form.get('note')?.value,
            categoryId: this.readingContent.categoryId,
            readingContentId: this.readingContentId,
            answers: form.get('answers')?.value.map((answer: string, index: number) => ({
              answer,
              isCorrect: index === form.get('correctAnswer')?.value
            }))
          }
          this.questionService.update(item.id, data)
            .subscribe(() => {
              this.notificationService.success(
                this.translate.instant('success.title'),
                this.translate.instant('success.update'),
                { nzDuration: 3000 }
              );
              this.getData(this.readingContentId)
            })
          this.modal.closeAll();
        }
        return false;
      },
    });
  }
}
