import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './main/content/pages/page-not-found/page-not-found.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'apps/order',
    loadChildren: './modules/order/order.module#OrderModule'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404',
  },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
