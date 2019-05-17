import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirect implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/status');
      return false;
    } else {
      return true;
    }
  }
}
