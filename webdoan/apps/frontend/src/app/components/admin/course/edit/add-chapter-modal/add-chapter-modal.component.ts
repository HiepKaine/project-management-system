import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { TextControlComponent } from '@webpress/form';

@Component({
  selector: 'app-add-chapter-modal',
  templateUrl: './add-chapter-modal.component.html',
  styleUrls: ['./add-chapter-modal.component.scss'],
})
export class AddChapterModalComponent implements OnInit {
  public form = this.fb.group({
    name: new UntypedFormControl(null, [Validators.required])
  })

  @ViewChild('formInputs', { static: true }) formInputs!: NgxFormrAnchorComponent;

  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager
  ) { }

  ngOnInit(): void {
    const ngxForm = this.ngxFormManager.init(this.form, {
      name: {
        component: TextControlComponent,
        option: {
          label: 'Tên chương'
        }
      }
    })
    this.ngxFormManager.render(ngxForm, this.formInputs.viewContainerRef)
  }
}
