import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string ) {
    return this.http.post('http://app.eiz.com.au/auth', {username: username, password: password}, {}).map(data => {
        if (data['ack']){
          localStorage.setItem('token', data['data']['token']);
          return data['data']['token'];
        }
        return false;
    });
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem('expires_at');
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }
}
