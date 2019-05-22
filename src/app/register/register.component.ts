import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

// Composant chargé de la deuxième partie de la création d'un compte.
export class RegisterComponent implements OnInit {
  user: User = new User();
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  // Envoie au backend la clé que l'utilisateur a reçue par mail, l'username qu'il choisit et son mot de passe.
  onRegister(): void {
    this.auth.register(this.user)
      .then((user) => {
        console.log(user);
        this.router.navigateByUrl('/login');
      })
        .catch((err) => {
          console.log(err);
        });
  }
}
