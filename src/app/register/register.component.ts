import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onRegister(): void {
    this.auth.register(this.user)
      .then((user) => {
        localStorage.setItem('token', user.auth_token);
        this.router.navigateByUrl('/status');
      })
        .catch((err) => {
          console.log(err);
        });
  }
}
