import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/userModel';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private USERS = '/assets/api';
  loggedIn: any = true;

  constructor(
    private readonly http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}
  public getUsers(): Observable<User[]> {
    const url = `${this.USERS}/users.json`;
    return this.http.get<User[]>(url);
  }
  isUserLoggedIn(): Observable<any> {
    return this.localStorageService.observe('isUserLoggedIn');
  }
  login(child): void {
    this.localStorageService.store('userHeader', JSON.stringify(child));
  }
}
