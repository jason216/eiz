import { DatatableComponent } from '@swimlane/ngx-datatable';
import {
  TableColumn,
  ColumnMode
} from '@swimlane/ngx-datatable';

import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderService } from './../../services/order.service';
import { PaginationService } from './../../services/pagination.service';

import { fuseAnimations } from '../../core/animations';
import { FuseUtils } from '../../core/fuseUtils';
import { OrderSearchDialogComponent } from './components/order-search-dialog/order-search-dialog.component';
import { Page } from '../../models/page.model';
import 'rxjs/add/operator/takeWhile';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: fuseAnimations
})
export class OrderComponent implements OnInit, OnDestroy {
  private startSubscribe: boolean = true;
  @ViewChild('myTable') table: any;

  rows: any[] = [];
  page = new Page();
  expanded: any = {};
  timeout: any;

  public columnsRef = [
    { prop: "account_id", name: "Account ID" },
    { prop: "customer_id", name: "Customer ID" },
    { prop: "id", name: "ID" }
  ];

  constructor(
    public dialog: MatDialog,
    public orderService: OrderService,
    public paginationService: PaginationService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 12;

  }

  ngOnInit() {
      this.setPage({ offset: 0 });
  }
  ngOnDestroy(){
    this.startSubscribe = false;
  }
  openAdvancedSearch(): void {
    const dialogRef = this.dialog.open(OrderSearchDialogComponent, {
      width: '600px',
     // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().takeWhile(() => this.startSubscribe).subscribe(result => {
      //console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  //Order Table Related functions

  setPage(pageInfo) {
    //console.log("click page info", pageInfo);
    this.page.pageNumber = pageInfo.offset + 1;
    //console.log("OFFSET", this.page.pageNumber);

    const params = this.paginationService.encodeResponse(this.page.pageNumber  );
    //console.log("params", params);

    this.orderService.getOrders(params)
    .takeWhile(() => this.startSubscribe)
    .subscribe(
      res => {
        let pagedData = this.paginationService.decodeResponse(res);
        this.rows = [];
        this.rows = pagedData.data;
        this.rows = pagedData.data;
        //console.log("after reset page", pagedData.page);

        this.page = pagedData.page;
        // IMPORTANT NOTE: server-side page index start at 1, ngx-datatable page index start at 0
        this.page.pageNumber = this.page.pageNumber - 1;
        //console.log('data', this.rows);
        this.table.recalculate();
      },
      err => {
        console.log(`Error in order-get-orders: ${err}`);
      }
    );
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
}
