import { Component, OnInit } from '@angular/core';
import {ChatService} from '../services/chat.service';
import {PdfLoaderService} from '../services/pdf-loader.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

interface Message {
  id;
  message: string;
  username: string;
  matiere: string;
  score;
  uservote;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  private messages: Array<Message>;
  private messagesLoaded: Promise<boolean>;
  private message: string;
  private currentMatiere: string;

  constructor(private chat: ChatService, private pdfLoaderService: PdfLoaderService, private httpClient: HttpClient) {
    this.messages = [];
    this.pdfLoaderService.currentMatiere.subscribe( value => {
      this.currentMatiere = value;
    });
  }

  ngOnInit() {
    this.getMessageFromServer();
    this.chat.messages.subscribe(msg => {
      this.messages.push(msg);
    });
  }

  sendMessage() {
    if (this.message !== '') {
      const data = {
        username: localStorage.getItem('username'),
        message: this.message,
        matiere: this.currentMatiere,
        type: 'message',
        score: 0
      };
      this.chat.sendMsg(data);
      this.message = '';
    }
  }
  getMessageFromServer() {
    this.httpClient.get('http://127.0.0.1:5000/api/messages').subscribe(
      data => {
        this.messages = data as Array<Message>;
        this.messagesLoaded = Promise.resolve(true);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
  doVote(msg: Message) {
    const data = {
      id: msg.id,
      username: localStorage.getItem('username'),
      type: 'like',
      valeur: 0
    };
    if (msg.uservote === 1) {
      msg.uservote = 0;
      data.valeur = -1;
    } else {
      msg.uservote = 1;
      data.valeur = 1;
    }
    this.chat.sendMsg(data);
  }
}
