import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }
  private socket;
  message;
  ngOnInit() {
    this.socket = io.connect('http://127.0.0.1:5000');
    this.socket.on('chat message', (msg) => {
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(msg));
      document.getElementById('messages').appendChild(li);
      console.log(li);
    });
  }
  send() {
    this.socket.emit('my event', this.message);
    // console.log(this.message);
    this.message = '';
  }
}
