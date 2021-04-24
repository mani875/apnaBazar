import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private USERS = "/assets/api";

  constructor(private readonly http: HttpClient) { }
  public getUsers():Observable<User[]>{
    const url = `${this.USERS}/users.json`;
    return this.http.get<User[]>(url);
  }
}
