import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  isLogged: any = true;
  constructor(private readonly router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!localStorage.getItem('userHeader')) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  isLoggedIn(): Observable<any> {
    if (!localStorage.getItem('userHeader')) {
      return this.isLogged;
    }
  }
}
