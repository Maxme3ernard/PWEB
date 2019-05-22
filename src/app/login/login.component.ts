import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

// Gestion du login de l'utilisateur.
export class LoginComponent implements OnInit {
  user: User = new User();
  private errorMsg = '';
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  /* Envoi de l'username et du password en http au backend.
  Récupération du token et stockage en local.
   */
  onLogin() {
    this.auth.login(this.user).then((user) => {
      localStorage.setItem('token', user.auth_token);
      localStorage.setItem('username', user.username);
      this.router.navigateByUrl('/accueil');
    }).catch((err) => {
      this.errorMsg = err.error.message;
      console.log(err);
    });
  }
}
