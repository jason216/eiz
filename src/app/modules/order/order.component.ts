import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// import { DataSource } from '@angular/cdk/collections';
// import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '../../core/animations';
import { FuseUtils } from '../../core/fuseUtils';
//import { OrdersService } from './orders.service';
//import { MatPaginator, MatSort } from '@angular/material';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import 'rxjs/add/operator/startWith';
// import 'rxjs/add/observable/merge';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/observable/fromEvent';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: fuseAnimations
})
export class OrderComponent implements OnInit {

  constructor(

  ) {
  }

  ngOnInit() {

  }
}
