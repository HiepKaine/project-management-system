import {
  plainToInstance,
  Transform
} from 'class-transformer';
import { CategoryTransformer } from '../category/category.transformer';

import { AnswerTransformer } from './answer.transformer';
import { ReadingContentTransformer } from './reading-content.transformer';

export class QuestionTransformer {
  id: number;
  categoryId: number;
  question: string;
  createdAt: Date;
  updatedAt: Date;

  @Transform(({ value }) => {
    if (Array.isArray(value) && value.length > 0 && value[0] instanceof AnswerTransformer) {
      return value;
    } else {
      return value && Array.isArray(value) ? value.map(item => plainToInstance(AnswerTransformer, item)) : [];
    }
  })
  answers!: AnswerTransformer[];

  @Transform(({ value }) => {
    if (value instanceof CategoryTransformer) {
      return value;
    } else {
      return value ? plainToInstance(CategoryTransformer, value) : null
    }
  })
  category!: CategoryTransformer;

  @Transform(({ value }) => {
    if (value instanceof ReadingContentTransformer) {
      return value;
    } else {
      return value ? plainToInstance(ReadingContentTransformer, value) : null
    }
  })
  readingContent!: ReadingContentTransformer;
}
