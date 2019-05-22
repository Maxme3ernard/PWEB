import {AfterViewChecked, Component, OnInit} from '@angular/core';
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

// Composant chargé de l'affichage et de l'envoi de messages en temps réel.
export class ChatComponent implements OnInit, AfterViewChecked {

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
    this.chat.messages.subscribe(msg => { // Réception des messages en temps réel.
      if (msg.type === 'message') { // Si le type est 'message', il s'agit d'un message normal que l'on affiche.
        this.messages.push(msg);
        const container = document.getElementById('chatBox');
        container.scrollTop = container.scrollHeight;
      }
      if (msg.type === 'like') { // Si le type est 'like', il s'agit d'un nouveau like sur un message déjà envoyé.
        const updateMsg = this.messages.find((x) => x.id === msg.id);
        const index = this.messages.indexOf(updateMsg);
        this.messages[index].score = msg.score;
      }
    });
  }

  // Scroll automatique en bas du chat au chargement de la page.
  ngAfterViewChecked() {
    const container = document.getElementById('chatBox');
    container.scrollTop = container.scrollHeight;
  }

  // Envoi du message via le service chat.
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

  // Récupération des anciens messages depuis le backend via http, puis affichage des messages concernant la matière actuelle.
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

  // Gère le 'like' sur un message.
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
