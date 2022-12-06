import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  BehaviorSubject,
  combineLatest,
} from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@frontend/env/environment';
import {
  NbMediaBreakpointsService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';
import {
  UntilDestroy,
  untilDestroyed,
} from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';

import { LayoutService } from '../../../@core/utils';
import { sidebarStateLocalStorageKey } from '../../../const';
import { SidebarState } from '../../../types';
import { ListComponent } from '../notification/list/list.component';

@UntilDestroy()
@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() authenticated = true;
  public userPictureOnly = false;
  public sidebarState$: BehaviorSubject<SidebarState | null> = new BehaviorSubject<SidebarState | null>(null);
  public themes = [
    {
      value: 'default',
      name: 'Light'
    },
    {
      value: 'dark',
      name: 'Dark'
    },
    {
      value: 'cosmic',
      name: 'Cosmic'
    },
    {
      value: 'corporate',
      name: 'Corporate'
    }
  ];

  public currentTheme = 'default';

  public userMenu = [
    { title: 'Profile', link: '/admin/profile' },
    { title: 'Log out', link: '/auth/login' }
  ];
  componentList = ListComponent;
  component: unknown = this.componentList;
  constructor(
    private sidebarService: NbSidebarService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private router: Router,
    public translate: TranslateService,
  ) { }

  ngOnInit() {
    this.sidebarState$.next(localStorage.getItem(sidebarStateLocalStorageKey) as SidebarState ?? 'expanded');
    combineLatest([this.sidebarState$]).pipe(untilDestroyed(this)).subscribe(([state]) => {
      if (state === 'expanded') {
        localStorage.setItem(sidebarStateLocalStorageKey, 'expanded');
        this.sidebarService.expand('menu-sidebar');
        this.layoutService.changeLayoutSize();
      } else if (state === 'collapsed') {
        localStorage.setItem(sidebarStateLocalStorageKey, 'collapsed');
        this.sidebarService.collapse('menu-sidebar');
        this.layoutService.changeLayoutSize();
      }
    })
    this.currentTheme = this.themeService.currentTheme;
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.sidebarService.onToggle().subscribe(d => {
      console.log(d);
    })
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([currentBreakpoint]) => currentBreakpoint.width < xl),
        untilDestroyed(this)
      )
      .subscribe((isLessThanXl: boolean) => {
        this.userPictureOnly = isLessThanXl;
      });

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        untilDestroyed(this)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));

  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem(environment.languageLocalStorageKey, lang);
  }

  logout() {
    localStorage.removeItem(environment.tokenKey);
    sessionStorage.removeItem(environment.tokenKey);
    document.location.href = '/auth/login';
  }

  changeTheme(themeName: any) {
    this.themeService.changeTheme(themeName);
  }

  collapseSidebar() {
    this.sidebarState$.next('collapsed');
  }
  expandSidebar() {
    this.sidebarState$.next('expanded');
  }

  navigateLogin() {
    this.router.navigate(['/', 'auth', 'login']);
    return false;
  }


}
