import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from '../services/auth.service';

interface Post {
  id;
  message: string;
  username: string;
  matiere: string;
  score;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  private responses: Array<Post>;
  private responsesLoaded: Promise<boolean>;
  private response: string;
  @Input() id;
  @Input() message;
  @Input() username;
  @Input() score;

  constructor(private http: HttpClient, private auth: AuthService) { }

  ngOnInit() {
    this.getResponseFromServer();
    this.responses = new Array<Post>();
  }

  getResponseFromServer() {
    const params = new HttpParams().set('id', this.id);
    this.http.get('http://127.0.0.1:5000/api/responses', {params}).subscribe(
      data => {
        this.responses = data as Array<Post>;
        console.log(this.responses);
        this.responsesLoaded = Promise.resolve(true);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

  sendResponse() {
    if (this.response.length > 5) {
      const data = {
        ['id']: this.id,
        ['message']: this.response,
        ['username']: localStorage.getItem('username'),
        ['score']: 0
      };
      this.response = '';
      this.responses.push(data as Post);
      console.log(data);
      // this.auth.postResponse(data);
    }
  }
}
