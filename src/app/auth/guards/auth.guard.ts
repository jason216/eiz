import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isActive()){
          return true;
        }else {
          if (this.authService.renewToken()){
            return true;
          }
        }

        if (this.authService.isLoggedIn()){
          return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
