import {
  Component,
  Input,
  TemplateRef,
} from '@angular/core';

import {
  Observable,
  of,
} from 'rxjs';

import {
  NzRouteLabelFn,
  NzRouterItem,
} from './breadcrumb.type';

@Component({
  selector: 'breadcrumb',
  styleUrls: ['./breadcrumb.component.scss'],
  template: `<nz-breadcrumb [nzAutoGenerate]="nzAutoGenerate" [nzRouteLabel]="nzRouteLabel" [nzRouteLabelFn]="nzRouteLabelFn">
    <ng-container *ngIf="!nzAutoGenerate">
      <ng-container *ngFor="let item of getItems()|async">
        <nz-breadcrumb-item>
          <ng-container *ngIf="item.routerLink; else withoutRouterLink">
            <a [routerLink]="item.routerLink">{{item.label}}</a>
          </ng-container>
        <ng-template #withoutRouterLink>
          {{item.label}}
        </ng-template>
        </nz-breadcrumb-item>
      </ng-container>
    </ng-container>
  </nz-breadcrumb>`
})
export class BreadcrumbComponent {
  @Input() nzSeparator!: string | TemplateRef<void> | null;
  @Input() nzAutoGenerate = false;
  @Input() nzRouteLabel = 'breadcrumb';
  @Input() items?: NzRouterItem[] | Observable<NzRouterItem[]>;
  @Input() nzRouteLabelFn: NzRouteLabelFn = (label: string) => label;


  getItems(): Observable<NzRouterItem[]> {
    if (this.items) {
      if (Array.isArray(this.items)) {
        return of(this.items);
      } else {
        return this.items;
      }
    } else {
      return of([]);
    }
  }
}
