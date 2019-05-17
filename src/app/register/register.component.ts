import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onRegister(): void {
    this.auth.register(this.user)
      .then((user) => {
        localStorage.setItem('token', user.auth_token);
      })
        .catch((err) => {
          console.log(err);
        });
  }
}
