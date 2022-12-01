import { plainToInstance, Transform, Type } from "class-transformer";
import { UserTransformer } from "../auth/transformer/user.transformer";
import { ExamCodeTransformer } from "../exam/exam-code.transformer";

export class TestSessionTransformer {
  id: number;
  userId: number;
  examId: number;
  examCodeId: number;
  score: number;
  startTime: Date;
  completedAt: Date;
  status: number;
  correctQuestion: number;
  inCorrectQuestion: number;
  skipQuestion: number;
  createdAt: Date;
  updatedAt: Date;

  @Type(() => ExamCodeTransformer)
  @Transform(({ value }) => value ? ({ data: plainToInstance(ExamCodeTransformer, value) }) : null)
  examCode!: ExamCodeTransformer;

  @Type(() => UserTransformer)
  @Transform(({ value }) => {
    if (value instanceof UserTransformer) {
      return value;
    } else {
      return plainToInstance(UserTransformer, value)
    }
  })
  user!: UserTransformer;
}
