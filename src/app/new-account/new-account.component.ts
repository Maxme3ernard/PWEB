import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})

/* Création d'un nouveau compte.
   Envoi d'un mail à l'adresse mail indiquée, contenant un code secret pour vérifier le mail.
 */
export class NewAccountComponent implements OnInit {
  user: User = new User();
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  // Envoi des données via http.
  onSubmit() {
    this.auth.newAccount(this.user).then((user) => {
      if (!user.success) {
        console.log(user.result);
        this.router.navigateByUrl('/create_account');
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}
