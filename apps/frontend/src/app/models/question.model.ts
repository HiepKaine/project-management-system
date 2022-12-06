import { plainToInstance, Transform, Type } from 'class-transformer';

import { Answer } from './answer.model';
import { Category } from './category.model';
import { ReadingContent } from './reading-content.model';

export class Question {
  id!: number;
  categoryId!: number;
  question!: string;
  note!: string;
  readingContentId!: number | null;
  deletedAt!: Date;
  createdAt!: Date;
  updatedAt!: Date;

  @Type(() => Answer)
  @Transform(({ value }) => Array.isArray(value) && value.length > 0 ? value.map((item: Answer) => plainToInstance(Answer, item)) : [])
  answers!: Answer[];

  @Type(() => Category)
  @Transform(({ value }) => value ? plainToInstance(Category, value) : null)
  category!: Category | null;

  @Type(() => ReadingContent)
  @Transform(({ value }) => value ? plainToInstance(ReadingContent, value) : null)
  readingContent!: ReadingContent | null;

  isReadingQuestion() {
    return this.readingContentId !== undefined && this.readingContentId !== null;
  }
}

export class CreateQuestionDto {
  categoryId!: number;
  question!: string;
  note!: string;
  readingContentId?: number | string | null;
  answers!: { answer: string; isCorrect: boolean }[];
}
