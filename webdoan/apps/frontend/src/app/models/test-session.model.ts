import { plainToInstance, Transform, Type } from "class-transformer";
import { ExamCode } from "./exam-result.model";
import { TestSessionAnswer } from "./test-session-answer.model";
import { User } from "./user.model";

export class TestSession {
  id!: number;
  userId!: number;
  examId!: number;
  examCodeId!: number;
  score!: number;
  correctQuestion!: number;
  inCorrectQuestion!: number;
  skipQuestion!: number;
  status!: number;
  startTime!: Date;
  completedAt!: Date;
  createdAt!: Date;
  updatedAt!: Date;

  @Type(() => ExamCode)
  @Transform(({ value }) => {
    if(value && value.data){
      return plainToInstance(ExamCode, value.data);
    } else {
      return null;
    }
  })
  examCode!: ExamCode;

  @Type(() => User)
  @Transform(({ value }) => value ? plainToInstance(User, value) : null)
  user!: User;

  @Type(() => TestSessionAnswer)
  @Transform(({ value }) =>
    Array.isArray(value) && value.length > 0
      ? value.map((item: TestSessionAnswer) =>
        plainToInstance(TestSessionAnswer, item)
      )
      : []
  )
  testSessionAnswers!: TestSessionAnswer[];

  isPass(): boolean {
    const referencePoint = this.examCode.exam.referencePoint ?? 5;
    return Number(this.score) > Number(referencePoint);
  }
}


