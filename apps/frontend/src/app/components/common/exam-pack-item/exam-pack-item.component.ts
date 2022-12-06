import { Component, Input } from '@angular/core';
import { ExamPack } from '@frontend/models/exam-pack.model';

@Component({
  selector: 'app-exam-pack-item',
  templateUrl: './exam-pack-item.component.html',
  styleUrls: ['./exam-pack-item.component.scss'],
})
export class ExamPackItemComponent {
  @Input() item!:  ExamPack;
}
