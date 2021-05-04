import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  isLogged: any = true;
  constructor(
    private readonly router: Router,
    private localStorageService: LocalStorageService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.localStorageService.retrieve('userHeader')) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  isLoggedIn(): Observable<any> {
    if (!this.localStorageService.retrieve('userHeader')) {
      return this.isLogged;
    }
  }
}
