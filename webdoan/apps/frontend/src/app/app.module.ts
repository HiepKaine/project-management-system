import { CommonModule, registerLocaleData } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import localeVi from '@angular/common/locales/vi';
import { ErrorHandler, forwardRef, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationEnd, Router } from '@angular/router';

import isNil from 'lodash-es/isNil';
import { en_US, NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { filter } from 'rxjs';

import { TokenInterceptor } from '@frontend/common';
import { environment } from '@frontend/env/environment';
import { NgxAdminModule } from '@frontend/theme';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ShellEffects } from './+state/shell/shell.effects';
import * as shellReducer from './+state/shell/shell.reducer';
import { ExceptionHandler } from './@core/exceptions/ExceptionHandler';
import { AdminGuard } from './@core/guard/admin.guard';
import { UserOrAdminGuard } from './@core/guard/user-or-admin.guard';
import { UserGuard } from './@core/guard/user.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterComponent } from './master.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(localeVi);

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    NgxAdminModule,
    StoreModule.forRoot(
      { shell: shellReducer.reducer },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([ShellEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'vi',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: () => {
        const defaultLanguage = isNil(environment.defaultLanguage)
          ? environment.defaultLanguage
          : 'vi';
        const currentLanguage =
          localStorage.getItem(environment.languageLocalStorageKey) ||
          defaultLanguage;
        switch (currentLanguage) {
          case 'vi':
            return 'vi-VN';
          case 'en':
            return 'en-US';
          default:
            return 'en-US';
        }
      },
    },
    {
      provide: NZ_I18N,
      useFactory: (localId: string) => {
        switch (localId) {
          case 'en':
            return en_US;
          case 'vi':
            return vi_VN;
          default:
            return en_US;
        }
      },
      deps: [LOCALE_ID],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: forwardRef(() => TokenInterceptor),
      multi: true,
    },
    { provide: ErrorHandler, useClass: ExceptionHandler },
    AdminGuard,
    UserGuard,
    UserOrAdminGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private translate: TranslateService, private router: Router) {
    const defaultLanguage = isNil(environment.defaultLanguage)
      ? environment.defaultLanguage
      : 'vi';
    const languages = environment.availabelLanguages || ['vi', 'en'];
    this.translate.addLangs(languages);
    this.translate.setDefaultLang(defaultLanguage);
    const currentLanguage =
      localStorage.getItem(environment.languageLocalStorageKey) ||
      defaultLanguage;
    this.translate.use(currentLanguage);

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        if (window) window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
}
