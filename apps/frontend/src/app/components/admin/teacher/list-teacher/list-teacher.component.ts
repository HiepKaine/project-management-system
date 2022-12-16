import { Component, OnInit } from '@angular/core';
import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Teacher } from '@frontend/models/teacher.model';
import { plainToInstance } from 'class-transformer';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.scss'],
})
export class ListTeacherComponent implements OnInit {
  public teachers: Teacher[] = [];
  public paginate!: ApiResponsePagination;
  public keyword!: string;
  
  constructor(private teacherService: TeacherService) {}

  getTeachers() {
    this.teacherService
      .get()
      .subscribe((result: ApiPaginateResponse<Teacher>) => {
        this.teachers = plainToInstance(Teacher, result.data);
      });
  }
  ngOnInit(): void {}
}
