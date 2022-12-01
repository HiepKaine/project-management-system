import {
  Injectable,
  OnDestroy,
} from '@angular/core';

import {
  BehaviorSubject,
  Observable,
  of as observableOf,
} from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import {
  NbLayoutDirection,
  NbLayoutDirectionService,
} from '@nebular/theme';

@Injectable()
export class StateService implements OnDestroy {

  protected layouts: Record<string, unknown>[] = [
    {
      name: 'One Column',
      icon: 'nb-layout-default',
      id: 'one-column',
      selected: true,
    },
    {
      name: 'Two Column',
      icon: 'nb-layout-two-column',
      id: 'two-column',
    },
    {
      name: 'Center Column',
      icon: 'nb-layout-centre',
      id: 'center-column',
    },
  ];

  protected sidebars: Record<string, unknown>[] = [
    {
      name: 'Sidebar at layout start',
      icon: 'nb-layout-sidebar-left',
      id: 'start',
      selected: true,
    },
    {
      name: 'Sidebar at layout end',
      icon: 'nb-layout-sidebar-right',
      id: 'end',
    },
  ];

  protected layoutState$ = new BehaviorSubject(this.layouts[0]);
  protected sidebarState$ = new BehaviorSubject(this.sidebars[0]);

  alive = true;

  constructor(directionService: NbLayoutDirectionService) {
    directionService.onDirectionChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(direction => this.updateSidebarIcons(direction));

    this.updateSidebarIcons(directionService.getDirection());
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private updateSidebarIcons(direction: NbLayoutDirection) {
    const [startSidebar, endSidebar] = this.sidebars;
    const isLtr = direction === NbLayoutDirection.LTR;
    const startIconClass = isLtr ? 'nb-layout-sidebar-left' : 'nb-layout-sidebar-right';
    const endIconClass = isLtr ? 'nb-layout-sidebar-right' : 'nb-layout-sidebar-left';
    startSidebar['icon'] = startIconClass;
    endSidebar['icon'] = endIconClass;
  }

  setLayoutState(state: Record<string, unknown>) {
    this.layoutState$.next(state);
  }

  getLayoutStates(): Observable<unknown[]> {
    return observableOf(this.layouts);
  }

  onLayoutState(): Observable<unknown> {
    return this.layoutState$.asObservable();
  }

  setSidebarState(state: Record<string, unknown>) {
    this.sidebarState$.next(state);
  }

  getSidebarStates(): Observable<unknown[]> {
    return observableOf(this.sidebars);
  }

  onSidebarState(): Observable<unknown> {
    return this.sidebarState$.asObservable();
  }
}
