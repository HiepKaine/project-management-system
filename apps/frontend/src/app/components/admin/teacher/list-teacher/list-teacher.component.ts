import { Component, OnInit } from '@angular/core';
import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Teacher } from '@frontend/models/teacher.model';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@shared/components/notification/notification.service';
import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.scss'],
})
export class ListTeacherComponent implements OnInit {
  public teachers: Teacher[] = [];
  public pagination!: ApiResponsePagination;
  public keyword!: string;

  constructor(
    private teacherService: TeacherService,
    private modal: NzModalService,
    private notificationService: NotificationService,
    private translateService: TranslateService,
  ) {}

  getTeachers() {
    this.teacherService
      .get()
      .subscribe((result: ApiPaginateResponse<Teacher>) => {
        this.teachers = plainToInstance(Teacher, result.data);
        console.log(this.teachers);
      });
  }

  createTeacherModal() {
    const modal = this.modal.create({

    })
  }

  ngOnInit(): void {}
}
