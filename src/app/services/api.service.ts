import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {
  private url: string;
  private activeRequests= 0;

  constructor(private http: Http) {
    this.url = environment.apiUrl;
  }

  public get(endpoint: string, target: string): Promise<any> {
    let resourceUrl = this.url + '/' + endpoint + '/' + target;
    if (endpoint === 'auth') {
      resourceUrl = this.url + '/' + target;
    }
    ++this.activeRequests;

    return this.http.get(resourceUrl, this.setHeaders())
      .toPromise()
      .then(res => {
        this.loadingDone();
        return res.json() as any;
      })
      .catch(this.handleError.bind(this));
  }

  public post(endpoint: string, target: string, data: any, reply: boolean = true): Promise<any> {
    let resourceUrl = this.url + '/' + endpoint + '/' + target;
    if (endpoint === 'auth'){
      resourceUrl = this.url + '/' + target;
    }
    ++this.activeRequests;

    return this.http.post(resourceUrl, data, this.setHeaders())
      .toPromise()
      .then(res => {
        this.loadingDone();
        return (reply ? res.json() as any : null);
      })
      .catch(this.handleError.bind(this));
  }

  private handleError(error: any): any {
    console.log('API ERROR!');
    this.loadingDone();
    return Promise.reject(error.message || error);
  }

  public isLoading() {
    return (this.activeRequests > 0 ? true : false);
  }

  private loadingDone() {
    if (--this.activeRequests < 0) {
      this.activeRequests = 0;
    }
  }

  private setHeaders() {
    const headers = new Headers();

    headers.set('Content-Type', 'application/json; charset=UTF-8');
    headers.set('Authorization', 'Bearer' + localStorage.getItem('token'));

    return new RequestOptions({ headers: headers });
  }
}
