import { Component, OnInit } from '@angular/core';
import {ChatService} from '../services/chat.service';

interface Message {
  message: string;
  username: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  private messages: Array<Message>;
  private message: string;

  constructor(private chat: ChatService) {
    this.messages = [];
  }

  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      this.messages.push(msg);
      console.log(msg);
    });
  }

  sendMessage() {
    if (this.message !== '') {
      const data = {
        username: localStorage.getItem('username'),
        message: this.message
      };
      this.chat.sendMsg(data);
      this.message = '';
    }
  }
}
