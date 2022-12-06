import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import {
  FormBuilder,
  FormControl,
  NgxFormManager,
  NgxFormrAnchorComponent,
} from '@ngxform/platform';
import { TextControlComponent } from '@webpress/form';

@Component({
  selector: 'app-create-category-modal',
  templateUrl: './create-category-modal.component.html',
  styleUrls: ['./create-category-modal.component.scss'],
})
export class CreateCategoryModalComponent implements OnInit {
  public form: UntypedFormGroup = this.fb.group({
    name: new FormControl('', [Validators.required])
  })

  @ViewChild('formInputs', { static: true }) formInputs!: NgxFormrAnchorComponent;

  constructor(private fb: FormBuilder, private ngxFormManager: NgxFormManager) { }

  ngOnInit(): void {
    this.ngxFormManager.watch('editCategoryForm', this.form);
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

}
