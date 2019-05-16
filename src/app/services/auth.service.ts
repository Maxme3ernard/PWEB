import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:5000/api';
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) {}
  login(user): Promise<any> {
    const url = `${this.BASE_URL}/login`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }
  register(user): Promise<any> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }
}
