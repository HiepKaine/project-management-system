import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { plainToInstance } from 'class-transformer';

import { ApiCollectionResponse, ApiItemResponse } from '@frontend/common';
import { Option } from '@frontend/models/option.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import {
  FormControl,
  NgxFormManager,
  NgxFormrAnchorComponent,
} from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import {
  ImageUploadControlComponent,
  TextControlComponent,
} from '@webpress/form';

import { OptionService } from '../option.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '@frontend/env/environment';

@UntilDestroy()
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public optionId!: number;
  public option!: Option;
  public init$: BehaviorSubject<{ option: Option } | undefined> =
    new BehaviorSubject<{ option: Option } | undefined>(undefined);

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  public editOptionForm: UntypedFormGroup = this.fb.group({
    value: new FormControl(null, [Validators.required]),
  });

  constructor(
    private ngxFormManager: NgxFormManager,
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private optionService: OptionService,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {
    this.optionId = Number(this.activatedRoute.snapshot.params['id']);
    this.optionService
      .show(this.optionId)
      .pipe(untilDestroyed(this))
      .subscribe((result: ApiItemResponse<Option>) => {
        this.option = plainToInstance(Option, result.data);
        this.init$.next({ option: this.option });
      });
  }
  ngOnInit(): void {
    this.init$.subscribe((data) => {
      if (data) {
        let inputTemplate;
        let inputValue;
        switch (this.option.type) {
          case 'image':
            inputValue = [
              {
                uid: '1',
                name: data.option.value,
                status: 'done',
                url: data.option.value,
              },
            ];
            inputTemplate = {
              component: ImageUploadControlComponent,
              option: {
                NzSize: 'large',
                type: 'image',
                label: 'Ảnh',
                nzMultiple: false,
                queryParamKey: 'files',
                apiEndPoint: `${environment.apiUrl}/file/upload`,
                reponseHandler: (res: ApiCollectionResponse<{ url: string }>) =>
                  res.data[0].url,
                className: ['col-12', 'p-1'],
              },
            };
            break;
          case 'text':
            inputValue = this.option.value;
            inputTemplate = {
              component: TextControlComponent,
              option: {
                NzSize: 'large',
                type: 'text',
                label: 'Giá trị',
                className: ['col-12', 'p-1'],
              },
            };
            break;
        }
        this.editOptionForm.setValue({ value: inputValue });
        const ngxform = this.ngxFormManager.init(this.editOptionForm, {
          value: inputTemplate,
        });
        this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
      }
    });
  }

  onSubmit() {
    if (this.editOptionForm.valid) {
      const data = {
        value: this.editOptionForm.get('value')?.value,
      };

      if (this.option.type === 'image') {
        data.value = this.editOptionForm.get('value')?.value[0]?.url ?? null;;
      }

      this.optionService.update(this.optionId, data).subscribe(() => {
        this.notificationService.success(
          this.translate.instant('success.title'),
          this.translate.instant('success.update'),
          { nzDuration: 3000 }
        );
      });
    } else {
      this.ngxFormManager.markAllAsDirty(this.editOptionForm);
    }
  }
}
