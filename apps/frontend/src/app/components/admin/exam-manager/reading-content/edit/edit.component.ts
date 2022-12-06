import { plainToInstance } from 'class-transformer';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { ApiItemResponse } from '@frontend/common';
import { Dictionary } from '@frontend/models/dictionary.model';
import { ReadingContent } from '@frontend/models/reading-content.model';
import {
  UntilDestroy
} from '@ngneat/until-destroy';
import {
  NgxFormManager,
  NgxFormrAnchorComponent
} from '@ngxform/platform';
import {
  TextControlComponent,
  TinymceControlComponent
} from '@webpress/form';
import { ReadingContentService } from '../../service/reading-content.service';
import { CreateReadingContentDto, UpdateReadingContentDto } from '../types';


@UntilDestroy()

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  public readingContentId!: number;


  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe((param) => {
      this.readingContentId = Number(param['readingContentId']);
    })
  }

}
