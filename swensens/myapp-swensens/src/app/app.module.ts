import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PagesComponent } from './pages/pages.component';
import { ToolbarComponent } from './theme/toolbar/toolbar.component';
import { HorizontalMenuComponent } from './theme/menu/horizontal-menu/horizontal-menu.component';

import {register} from 'swiper/element/bundle';

import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
import { JwtInterceptor } from './core/interceptor/jwt.interceptor';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { CoreModule } from './core/core.module';

register();

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    ToolbarComponent,
    HorizontalMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
