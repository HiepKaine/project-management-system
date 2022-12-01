import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  public courseId!: number;
  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.paramMap.subscribe((data: ParamMap) => {
      this.courseId = Number(data.get('courseId'));
    })
  }
}
