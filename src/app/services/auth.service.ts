import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../models/user';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:5000/api';
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) {}

  login(user: User): Promise<any> {
    const url = `${this.BASE_URL}/login`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }

  register(user: User): Promise<any> {
    const url = `${this.BASE_URL}/create_account`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }

  newAccount(user: User): Promise<any> {
    const url = `${this.BASE_URL}/new_account`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }

  getTokenExpirationDate(token): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = localStorage.getItem('token');
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  ensureAuthenticated(token): Promise<any> {
    const url = `${this.BASE_URL}/status`;
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.get(url, {headers}).toPromise();
  }

  postResponse(data): Promise<any> {
    const url = `${this.BASE_URL}/respond`;
    return this.http.post(url, data, {headers: this.headers}).toPromise();
  }
}
