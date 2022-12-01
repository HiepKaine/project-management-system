import { plainToInstance, Transform, Type } from 'class-transformer';

import { Question } from './question.model';

export class ReadingContent {
  id!: number;
  title!: string;
  content!: string;
  type!: number;
  categoryId!: number;
  deletedAt!: Date;
  createdAt!: Date;
  updatedAt!: Date;

  @Type(() => Question)
  @Transform(({ value }) => Array.isArray(value) && value.length > 0 ? value.map((item: Question) => plainToInstance(Question, item)) : [])
  questions!: Question[];

  getTypeName() {
    if (this.type === 1) {
      return 'Điền từ';
    } else {
      return 'Bài đọc';
    }
  }
}

export enum ReadingContentType {
  fillWord = 1,
  readings = 2
}



