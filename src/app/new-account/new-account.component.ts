import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
  user: User = new User();
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  onSubmit() {
    this.auth.login(this.user).then((user) => {
      console.log(user);
    }).catch((err) => {
      console.log(err);
    });
  }
}
