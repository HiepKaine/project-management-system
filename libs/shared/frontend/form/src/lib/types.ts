import { TemplateRef } from '@angular/core';

import { Observable } from 'rxjs';

export interface NzOptionItem {
  label: string | number | TemplateRef<any>;
  value: any;
  disabled?: boolean;
  hide?: boolean;
  groupLabel?: string | TemplateRef<any>;
}

export interface WebpressControlOption {
  nzSpan?: number,
  nzPrefixIcon?: string,
  label?: string,
  className?: string | string[],
  nzSize?: 'large' | 'small' | 'default',
}


export interface TextControlOption extends WebpressControlOption {
  type?: 'text' | 'password',
  placeholder?: string;
}
export type DatepickerControlOption = WebpressControlOption


export interface SelectControlOption extends WebpressControlOption {
  nzOptions: NzOptionItem[] | Observable<NzOptionItem[]>;
  placeholder?: string;
  nzSuffixIcon?: TemplateRef<any> | string;
  nzMode?: 'multiple' | 'tags' | 'default';
  nzMaxMultipleCount?: number;
  nzMaxTagCount?: number;
  nzAllowClear?: boolean;
  nzShowSearch?: boolean;
  onOptionFetched?: (items: NzOptionItem[]) => void;
}

export interface RemoteSelectControlOption extends WebpressControlOption {
  nzOptions: Observable<NzOptionItem[]>;
  nzSuffixIcon?: TemplateRef<any> | string;
  nzMode?: 'multiple' | 'tags' | 'default';
  nzMaxMultipleCount?: number;
  nzMaxTagCount?: number;
  onOptionFetched?: (items: NzOptionItem[]) => void;
  showSearch?: boolean;
  allowClear?: boolean;
  onSearch?: (val: string) => void;
}

export interface TextareaControlOption extends Omit<WebpressControlOption, "nzPrefixIcon"> {
  nzMaxCharacterCount?: number;
  rows?: number;
  nzAutosize?: { minRows: number, maxRows: number };
  nzComputeCharacterCount?: (v: string) => number;
}

export interface ImageUploadValue {
  uid: string,
  name: string,
  status: 'uploading' | 'done' | 'error' | 'removed',
  url: string,
}
export interface ImageUploadControlOption extends Omit<WebpressControlOption, "nzPrefixIcon"> {
  apiEndPoint: string;
  queryParamKey?: string;
  nzAccept?: string;
  nzDirectory?: boolean;
  nzMultiple?: boolean;
  extraUploadParam?: Record<string, any>
  reponseHandler: (res: any) => string;
}

export interface TinyMceControlOption extends Omit<WebpressControlOption, "nzPrefixIcon"> {
  apiEndPoint: string;
  queryParamKey?: string;
}

export interface RadioControlOption extends WebpressControlOption {
  nzOptions: NzOptionItem[] | Observable<NzOptionItem[]>;
  nzSuffixIcon?: TemplateRef<any> | string,
  onOptionFetched?: (items: NzOptionItem[]) => void;
}
