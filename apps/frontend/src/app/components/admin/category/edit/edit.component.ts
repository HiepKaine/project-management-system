import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { plainToInstance } from 'class-transformer';

import { ApiItemResponse } from '@frontend/common';
import { Category } from '@frontend/models/category.model';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import {
  FormControl,
  NgxFormManager,
  NgxFormrAnchorComponent,
} from '@ngxform/platform';
import {
  NotificationService,
} from '@shared/components/notification/notification.service';
import { TextControlComponent } from '@webpress/form';

import { CategoryService } from '../category.service';

@UntilDestroy()
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public categoryId!: number;
  public category!: Category;
  public editCategoryForm: UntypedFormGroup = this.fb.group({
    name: new FormControl(null, [Validators.required])
  });

  @ViewChild('formInputs', { static: true }) formInputs!: NgxFormrAnchorComponent;

  constructor(
    private ngxFormManager: NgxFormManager,
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private notificationService: NotificationService,
    private translate: TranslateService,
  ) {
    this.categoryId = Number(this.activatedRoute.snapshot.params['id']);
    this.categoryService.show(this.categoryId).subscribe((result: ApiItemResponse<Category>) => {
      this.category = plainToInstance(Category, result.data);
      this.editCategoryForm.setValue({ name: this.category.name });
    })
  }

  ngOnInit(): void {
    this.ngxFormManager.watch('editCategoryForm', this.editCategoryForm);
    this.ngxFormManager.cast('editCategoryForm', {
      name: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          label: 'Tên danh mục',
          className: ['col-12', 'p-1']
        }
      }
    })
    this.ngxFormManager.render('editCategoryForm', this.formInputs.viewContainerRef);
  }

  onSubmit() {
    if (this.editCategoryForm.valid) {
      this.categoryService.update(this.categoryId, { name: this.editCategoryForm.get('name')?.value }).subscribe(() => {
        this.notificationService.success(this.translate.instant('success.title'), this.translate.instant('success.update'), { nzDuration: 3000 });
      })
    } else {
      this.ngxFormManager.markAllAsDirty(this.editCategoryForm);
    }
  }
}
