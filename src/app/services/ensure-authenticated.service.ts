import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})

// Service vérifiant si l'utilisateur est connecté, utile pour le routage.
export class EnsureAuthenticated implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.auth.isTokenExpired()) {
      localStorage.removeItem('token');
    }
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
