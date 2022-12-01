import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  HostBinding,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Validators } from '@angular/forms';

import { catchError } from 'rxjs';

import { ApiCollectionResponse } from '@frontend/common';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NgxFormManagerComponent } from '@ngxform/platform';

import { TinyMceControlOption } from '../types';
import {
  TinymceControlConfig,
  TinymceControlConfigService,
} from './tinymce-control.module';

@UntilDestroy()
@Component({
  selector: 'app-tinymce-control',
  templateUrl: './tinymce-control.component.html',
  styleUrls: ['./tinymce-control.component.scss'],
})
export class TinymceControlComponent extends NgxFormManagerComponent<TinyMceControlOption> implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @HostBinding('class') className!: string;

  constructor(private http: HttpClient, @Inject(TinymceControlConfigService) public config: TinymceControlConfig) {
    super();
    this.config = this.config ?? {
      base_url: '/tinymce',
      fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
      plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'],
      toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | outdent indent | link image | table ',
      image_title: true,
      height: '300',
      file_picker_types: 'image',
      convert_urls: false,
      link_rel_list: [
        { title: 'None', value: '' },
        { title: 'No Follow', value: 'nofollow' },
        { title: 'No Follow No Opener No Referrer', value: 'nofollow noopener noreferrer' },
        { title: 'No Opener No Referrer', value: 'noopener noreferrer' },
        { title: 'UGC', value: 'ugc' },
        { title: 'Sponsored', value: 'sponsored' }
      ],
      file_picker_callback: (callback: any, value: any, meta: any) => {
        if (meta.filetype == 'image') {
          const el = this.fileInput.nativeElement as HTMLElement;
          el.click();
          el.onchange = (e: any) => {

            const formData: FormData = new FormData();
            formData.append(this.option.queryParamKey || 'files', e.target.files[0]);
            this.http.post<ApiCollectionResponse<{ url: string }>>(this.option.apiEndPoint, formData).pipe(
              catchError((error) => {
                throw error;
              })
            ).subscribe((result: ApiCollectionResponse<{ url: string }>) => {
              callback(result.data[0].url)
            });
          }
        }
      },
    }
  }

  hasRequiredValidator() {
    return this.control.hasValidator(Validators.required)
  }


  ngOnInit(): void {
    if (this.option.className) {
      if (Array.isArray(this.option.className)) {
        this.className = this.option.className.join(' ');
      } else {
        this.className = this.option.className;
      }
    }
  }


  onChange(e: any): void {
    this.control.setValue(e.editor.getContent());
  }

}
