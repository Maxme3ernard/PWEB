import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  onLogin() {
    this.auth.login(this.user).then((user) => {
      console.log(user);
    }).catch((err) => {
      console.log(err);
    });
  }

}
