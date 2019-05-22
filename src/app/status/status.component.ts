import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})

// Composant de gestion du compte utilisateur, où il pourra changer son mot de passe par exemple (TODO)
export class StatusComponent implements OnInit {
  isLoggedIn = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.auth.ensureAuthenticated(token)
        .then((user) => {
          console.log(user);
          if (user.status === 'success') {
            this.isLoggedIn = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
