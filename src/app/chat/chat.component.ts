import { Component, OnInit } from '@angular/core';
import {ChatService} from '../services/chat.service';
import {PdfLoaderService} from '../services/pdf-loader.service';

interface Message {
  message: string;
  username: string;
  matiere: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  private messages: Array<Message>;
  private message: string;
  private currentMatiere: string;

  constructor(private chat: ChatService, private pdfLoaderService: PdfLoaderService) {
    this.messages = [];
    this.pdfLoaderService.currentMatiere.subscribe( value => {
      this.currentMatiere = value;
    });
  }

  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      this.messages.push(msg);
    });
  }

  sendMessage() {
    if (this.message !== '') {
      const data = {
        username: localStorage.getItem('username'),
        message: this.message,
        matiere: this.currentMatiere
      };
      this.chat.sendMsg(data);
      this.message = '';
    }
  }
}
