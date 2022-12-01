import {
  Component,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

import {
  NzDropdownMenuComponent,
  NzPlacementType,
} from 'ng-zorro-antd/dropdown';

import {
  ContextMenuItem,
  NzTriggerType,
} from './context-menu.const';

@Component({
  selector: 'context-menu',
  template: `
    <div class="context-menu" nz-button nz-dropdown [nzTrigger]="nzTrigger" [nzDisabled]="nzDisabled" [nzDropdownMenu]="menu" [nzPlacement]="nzPlacement">
      <ng-container *ngIf="contextMenu; else cIcon">
        <ng-container *ngTemplateOutlet="contextMenu"></ng-container>
      </ng-container>
      <ng-template #cIcon><i *ngIf="contextIcon" nz-icon [nzType]="contextIcon"></i></ng-template>
    </div>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu>
        <ng-container *ngFor="let item of items">
          <li nz-menu-item>
            <i *ngIf="item.icon" nz-icon [nzType]="item.icon"></i>
            <span>{{item.label}}</span>
          </li>
        </ng-container>
      </ul>
    </nz-dropdown-menu>
  `,
  styles: [`
    .context-menu {
      display: inline-block;
    }
  `
  ]
})
export class ContextMenuComponent {
  @Input() contextIcon?: string;
  @Input() contextMenu!: TemplateRef<any>;
  @Input() nzPlacement: NzPlacementType = 'bottomRight';
  @Input() nzDisabled!: boolean;
  @Input() nzTrigger: NzTriggerType = 'click';
  @Input() items: ContextMenuItem[] = [];
  @Output() nzDropdownMenu!: TemplateRef<NzDropdownMenuComponent>
}
