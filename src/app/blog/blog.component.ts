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

/* Composant de gestion des questions archivées (en bas de la page principale,
   Il est chargé d'afficher les différentes questions (componsant post).
 */
export class BlogComponent implements OnInit {
  private postsLoaded: Promise<boolean>;
  private currentMatiere: string;
  private posts: Array<Post>;

  constructor(private pdfService: PdfLoaderService, private auth: AuthService, private post: PostComponent, private http: HttpClient) { }

  ngOnInit() {
    this.getPostFromServer();
    this.pdfService.currentMatiere.subscribe( value => {
      this.currentMatiere = value; // Récupération de la matière actuellement étudiée pour afficher seulement les questions liées.
    });
  }

  // Récupération des posts de la base de données du backEnd via une requête http.
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

  // Tri des posts par score (les plus likés en premier)
  sortPostByScore() {
    this.posts.sort((a, b) => {
      return b.score - a.score;
    });
    console.log(this.posts);
  }

  // Tri des posts par date (les plus récents en premier)
  sortPostById() {
    this.posts.sort((a, b) => {
      return b.id - a.id;
    });
    console.log(this.posts);
  }

  // Filtrage des posts pour afficher seulement ceux de la matière actuelle
  filterPostOfMatiere() {
    return this.posts.filter(x => x.matiere === this.currentMatiere);
  }
}
