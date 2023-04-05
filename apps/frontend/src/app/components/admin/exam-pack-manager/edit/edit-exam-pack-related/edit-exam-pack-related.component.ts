// import { Component, OnInit, ViewChild } from '@angular/core';
// import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { ApiCollectionResponse, ApiItemResponse, ApiPaginateResponse } from '@frontend/common';
// import { ExamPack } from '@frontend/models/exam-pack.model';
// import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
// import { TranslateService } from '@ngx-translate/core';
// import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
// import { NotificationService } from '@shared/components/notification/notification.service';
// import { RemoteSelectControlComponent } from '@webpress/form';
// import { plainToInstance } from 'class-transformer';
// import { result } from 'lodash-es';
// import { NzModalService } from 'ng-zorro-antd/modal';
// import {
//   BehaviorSubject,
//   debounceTime,
//   distinctUntilChanged,
//   map,
//   switchMap,
// } from 'rxjs';
// import { ExamPackManagerService } from '../../exam-pack-manager.service';

// @UntilDestroy()
// @Component({
//   selector: 'app-edit-exam-pack-related',
//   templateUrl: './edit-exam-pack-related.component.html',
//   styleUrls: ['./edit-exam-pack-related.component.scss'],
// })
// export class EditExamPackRelatedComponent implements OnInit {
//   public form: UntypedFormGroup = this.fb.group({
//     relatedExamPack: new UntypedFormControl(null),
//   });

//   public examPackId!: number;
//   public examPack!: ExamPack;
//   public relatedExamPacks: ExamPack[] = [];

//   @ViewChild('formInputs', { static: true })
//   formInputs!: NgxFormrAnchorComponent;

//   private relatedExamPack$: BehaviorSubject<string> =
//     new BehaviorSubject<string>('');

//   constructor(
//     private fb: UntypedFormBuilder,
//     private ngxFormManager: NgxFormManager,
//     private examPackManagerService: ExamPackManagerService,
//     private activatedRoute: ActivatedRoute,
//     private notificationService: NotificationService,
//     private translate: TranslateService,
//     private modal: NzModalService
//   ) {
//     this.activatedRoute.parent?.params.subscribe((parem) => {
//       this.examPackId = Number(parem['id']);
//     });
//   }

//   private getRelated(examPackId: number) {
//     this.examPackManagerService
//       .getRelated(examPackId)
//       .pipe(untilDestroyed(this))
//       .subscribe((result: ApiCollectionResponse<ExamPack>) => {
//         this.relatedExamPacks = result.data.map((item) =>
//           plainToInstance(ExamPack, item)
//         );
//       });
//   }
//   ngOnInit(): void {
//     this.getRelated(this.examPackId);
//     this.examPackManagerService
//       .show(this.examPackId)
//       .pipe(untilDestroyed(this))
//       .subscribe((result: ApiItemResponse<ExamPack>) => {
//         this.examPack = plainToInstance(ExamPack, result.data);
//       });

//     const ngxform = this.ngxFormManager.init(this.form, {
//       relatedExamPack: {
//         component: RemoteSelectControlComponent,
//         option: {
//           showSearch: true,
//           allowClear: true,
//           nzSize: 'large',
//           type: 'text',
//           className: ['col-12', 'p-1'],
//           nzOptions: this.relatedExamPack$.pipe(
//             debounceTime(500),
//             distinctUntilChanged(),
//             switchMap((keyword: string) =>
//               this.examPackManagerService.getActiveExamPack({ keyword })
//             ),
//             map((result: ApiPaginateResponse<ExamPack>) =>
//               result.data.map((i) => ({ label: i.name, value: i }))
//             )
//           ),
//           onSearch: (val: string) => {
//             this.relatedExamPack$.next(val);
//           },
//         },
//       },
//     });
//     this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
//   }

//   addRelated(){
//     const examPack = this.form.get('relatedExamPack')?.value;
//     if (!examPack) {
//       this.notificationService.error(
//         this.translate.instant('error.title'),
//         'Vui lòng chọn trắc nhiệm liên quan',
//         { nzDuration: 3000 }
//       );
//     } else if (this.relatedExamPacks.find((item) => item.id === examPack.id)) {
//       this.notificationService.error(
//         this.translate.instant('error.title'),
//         'Trắc nhiệm liên quan đã được thêm',
//         { nzDuration: 3000 }
//       );
//     } else {
//       this.examPackManagerService
//         .addRelated(this.examPackId, examPack.id)
//         .subscribe(() => {
//           this.form.setValue({ relatedExamPack: null });
//           this.getRelated(this.examPackId);
//           this.notificationService.success(
//             this.translate.instant('success.title'),
//             this.translate.instant('success.create'),
//             { nzDuration: 3000 }
//           );
//         });
//     }
//   }
//   removeRelated(item: ExamPack): void {
//     this.modal.warning({
//       nzTitle: 'Xoá trắc nhiệm liên quan',
//       nzContent: `Bạn đang xoá trắc nhiệm liên quan ${item.name}`,
//       nzOnOk: () => {
//         this.examPackManagerService
//           .removeRelated(this.examPackId, item.id)
//           .subscribe(() => {
//             this.getRelated(this.examPackId);
//             this.notificationService.success(
//               this.translate.instant('success.title'),
//               this.translate.instant('success.delete'),
//               { nzDuration: 3000 }
//             );
//           });
//       },
//     });
//   }
// }
