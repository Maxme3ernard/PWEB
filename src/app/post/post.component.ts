import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from '../services/auth.service';

interface Post {
  id;
  message: string;
  username: string;
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
  @Input() matiere;

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
        ['username']: localStorage.getItem('username')
      };
      this.response = '';
      this.responses.push(data as Post);
      this.auth.postResponse(data);
    }
  }
  doVote() {
    const params = new HttpParams().set('id', this.id).set('username', this.username);
    console.log(params)
    this.http.get('http://127.0.0.1:5000/api/posts/like', {params}).subscribe(
      (response) => {
        // @ts-ignore
        this.score = response.score;
        console.log(response);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
}
