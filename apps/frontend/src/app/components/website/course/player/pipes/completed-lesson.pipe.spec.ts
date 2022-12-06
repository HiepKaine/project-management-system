import { CompletedLessonPipe } from './completed-lesson.pipe';

describe('CompletedLessonPipe', () => {
  it('create an instance', () => {
    const pipe = new CompletedLessonPipe();
    expect(pipe).toBeTruthy();
  });
});
