import { ApiService } from './../../services/api.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {


  constructor(private http: HttpClient) { }

  login(username: string, password: string ) {

    return this.http.post('http://app.eiz.com.au/auth/auth', { email: username, password: password }, {} ).map(data => {
      if (data['ack']) {
        this.setSession(data['data']);
        return true;
      }
      return false;
    });
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult['expires_at'], 'second');
    const activeAt = moment().add(authResult['refresh_expires_at'] , 'second');
    localStorage.setItem('token', authResult['token']);
    localStorage.setItem('refresh_expires_at', JSON.stringify(activeAt.valueOf()) );
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_expires_at');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    if(localStorage.getItem('token')){
      if (moment().isBefore(this.getExpiration())){
        return true;
      }
    }
    return false;
  }

  public isLoggedOut() {
      return !this.isLoggedIn();
  }

  private getStorageTime(itemName: string){
    const item = JSON.parse(localStorage.getItem(itemName));
    return moment(item);
  }
  getExpiration() {
      return this.getStorageTime('expires_at');
  }

  getActive() {
    return this.getStorageTime('refresh_expires_at');
  }
  isActive() {
    const activeTime = this.getActive();

    if (moment().isBefore(activeTime)) {
      return true;
    }else{
      return false;
    }

  }

  renewToken(){
    let newActive = moment().add(1, 'm');
    if (newActive.isBefore(this.getExpiration())){
      localStorage.removeItem('refresh_expires_at');
      localStorage.addItem('refresh_expires_at', newActive );

      return true;
    }else{
      this.logout();
      return false;
    }
  }

}
