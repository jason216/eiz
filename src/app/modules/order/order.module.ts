import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from '../../core/modules/shared.module';
import { FuseWidgetModule } from '../../core/components/widget/widget.module';

import { OrderComponent } from './order.component';
import { OrderSearchDialogComponent } from './components/order-search-dialog/order-search-dialog.component';

import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
  }

];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    FuseWidgetModule,
    NgxChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
    })
  ],
  declarations: [
    OrderComponent,
    OrderSearchDialogComponent
  ],
  entryComponents: [
    OrderSearchDialogComponent
  ]
})

export class OrderModule {

}



