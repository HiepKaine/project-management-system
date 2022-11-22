import { HttpClient } from '@angular/common/http';
import {
  Component,
  HostBinding,
  OnInit
} from '@angular/core';
import { Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NgxFormManagerComponent } from '@ngxform/platform';
import {
  NzUploadFile,
  NzUploadXHRArgs
} from 'ng-zorro-antd/upload';
import {
  catchError,
  Observable,
  Subscription
} from 'rxjs';
import { ImageUploadControlOption } from '../types';




const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@UntilDestroy()
@Component({
  selector: 'app-image-upload-control',
  templateUrl: './image-upload-control.component.html',
  styleUrls: ['./image-upload-control.component.scss'],
})
export class ImageUploadControlComponent extends NgxFormManagerComponent<ImageUploadControlOption> implements OnInit {
  public fileList: NzUploadFile[] = [];
  public previewImage: string | undefined = '';
  public previewVisible = false;

  @HostBinding('class') className!: string;

  constructor(private http: HttpClient) {
    super();
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
    if (this.control.value) {
      this.fileList = this.control.value;
    }
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  onChange(val: string): void {
    this.control.setValue(val);
  }

  handleChange(data: any) {
    if (data.file && data.file.response) {
      if (!this.option.nzMultiple) {
        this.fileList = [{
          uid: '1',
          name: this.option.reponseHandler(data.file.response),
          status: 'done',
          url: this.option.reponseHandler(data.file.response),
          raw: data.file.response,
        }];
      } else {
        this.fileList = data.fileList.map((item: any) => {
          return item.response ? ({
            uid: item.uid,
            name: this.option.reponseHandler(data.file.response),
            status: 'done',
            url: this.option.reponseHandler(data.file.response),
            raw: data.file.response
          }) : item;
        })
      }
      this.control?.setValue(this.fileList);
    }
  }

  handleUpload() {
    return (item: NzUploadXHRArgs): Subscription => {
      const formData = new FormData();
      formData.append(this.option.queryParamKey || 'files', item.file as any);
      if (this.option && this.option.extraUploadParam) {
        for (const [key, value] of Object.entries(this.option.extraUploadParam)) {
          formData.append(key, value);
        }
      }
      return this.http.post(this.option.apiEndPoint, formData).pipe(
        catchError((err: Error) => {
          if (item.onError) item.onError(err, item.file);
          throw err;
        })
      ).subscribe((response: any) => {
        if (item.onSuccess) item.onSuccess(response, item.file, null);
      });
    }
  }

  handleRemove() {
    return (file: NzUploadFile): boolean | Observable<boolean> => {
      this.fileList = this.fileList.filter(item => item.uid !== (file as any).uid);
      this.control.setValue(this.fileList);
      return true;
    }
  }

}
