import { ApiService } from '../services/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';


@Injectable()
export class OrderService {

  constructor(private apiService: ApiService){}

  public getOrders(params?: string): Observable<any>{
      return this.apiService.get('orders', 'orders', params);
  }


}
