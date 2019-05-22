import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

// Service vérifiant si l'utilisateur est connecté, utile pour le routage.
export class LoginRedirect implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isTokenExpired()) {
      localStorage.removeItem('token');
    }
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/status');
      return false;
    } else {
      return true;
    }
  }
}
