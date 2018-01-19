import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import 'hammerjs';

import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from './core/modules/shared.module';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';


import { AppComponent } from './app.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PageNotFoundComponent } from './main/content/pages/page-not-found/page-not-found.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

import { AuthGuard } from './auth/guards/auth.guard';
import { AuthService } from './auth/services/auth.service';
import { ApiTokenInterceptor } from './services/api-token.interceptor';
import { ApiService } from './services/api.service';
import { OrderService } from './services/order.service';
import { PaginationService } from './services/pagination.service';

import { routing } from './app.routing';

export const providers = [
  ApiService,
  OrderService,
  PaginationService
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        HttpClientModule,
        RouterModule,
        SharedModule,
        TranslateModule.forRoot(),
        FuseMainModule,
        routing
    ],
    providers   : [
        {
        provide: HTTP_INTERCEPTORS,
        useClass: ApiTokenInterceptor,
        multi: true
        },
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService,
        AuthGuard,
        AuthService,
        ApiService,
        OrderService,
        PaginationService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
