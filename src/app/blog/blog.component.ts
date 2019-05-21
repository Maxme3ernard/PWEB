import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {PdfLoaderService} from '../services/pdf-loader.service';
import {AuthService} from '../services/auth.service';
import {PostComponent} from '../post/post.component';

interface Post {
  id;
  message: string;
  username: string;
  matiere: string;
  score;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  private postsLoaded: Promise<boolean>;
  private currentMatiere: string;
  private posts: Array<Post>;

  constructor(private pdfService: PdfLoaderService, private auth: AuthService, private post: PostComponent, private http: HttpClient) { }

  ngOnInit() {
    this.getPostFromServer()
    this.pdfService.currentMatiere.subscribe( value => {
      this.currentMatiere = value;
    });
  }

  getPostFromServer() {
    this.http.get('http://127.0.0.1:5000/api/questions').subscribe(
      data => {
        this.posts = data as Array<Post>;
        this.postsLoaded = Promise.resolve(true);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
  sortPostByScore() {
    this.posts.sort((a, b) => a.score.localeCompare(b.score));
  }
  sortPostById() {
    this.posts.sort((a, b) => a.id.localeCompare(b.id));
  }
  filterPostOfMatiere() {
    return this.posts.filter(x => x.matiere === this.currentMatiere);
  }
}
