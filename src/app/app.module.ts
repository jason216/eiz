import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './main/content/pages/page-not-found/page-not-found.component';
import { DashboardComponent } from './main/content/app/dashboard/dashboard.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { AuthService } from './auth/services/auth.service';
import { RegisterComponent } from './auth/register/register.component';

const appRoutes: Routes = [
    {
        path      : 'login',
        component : LoginComponent
    },
    {
        path      : 'register',
        component : RegisterComponent
    },
    {
      path      : 'dashboard',
      component : DashboardComponent,
      canActivate: [AuthGuard]
    },
    {
      path      : '',
      redirectTo : '/dashboard',
      pathMatch: 'full'
    },
    {
        path      : '**',
        component: PageNotFoundComponent,
    },
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports     : [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        SharedModule,
        TranslateModule.forRoot(),
        FuseMainModule,
    ],
    providers   : [
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService,
        AuthGuard,
        AuthService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
