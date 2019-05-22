import {Component, Injectable, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PdfLoaderService} from '../services/pdf-loader.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-select-matiere',
  templateUrl: './select-matiere.component.html',
  styleUrls: ['./select-matiere.component.css']
})

// Composant chargé de gérer la sélection des matières.
@Injectable()
export class SelectMatiereComponent implements OnInit {
  private matieres: string[];
  private files: string[];
  private selectedMatiere: string;
  private selectedFile: string;
  private selectedAnnee: string;
  private anneeTC: string;
  private matiere: string;
  private file: string;
  private noFileSelected: boolean;

  filesLoaded: Promise<boolean>;
  matieresLoaded: Promise<boolean>;

  constructor(private pdfLoaderService: PdfLoaderService, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.getFilesFromServer();
    this.getMatieresFromServer();
  }

  // Vérifie qu'un sujet a bien été choisi puis l'envoie au pdf_loader qui l'affichera sur le pdf_displayer.
  onSubmit(form: NgForm) {
    if (form.value.file) {
      this.noFileSelected = false;
      this.anneeTC = form.value.anneeTC;
      this.matiere = form.value.matiere;
      localStorage.setItem('matiere', this.matiere);
      this.file = form.value.file;
      this.pdfLoaderService.setPDF(this.anneeTC, this.matiere, this.file + '_s');
      form.controls.file.reset();
    } else {
      this.noFileSelected = true;
    }
  }

  // Récupère les matières depuis le backend, triées par année.
  getMatieresFromServer() {
    this.httpClient.get('http://127.0.0.1:5000/api/matieres').subscribe(
      data => {
        this.matieres = data as string [];
        this.matieresLoaded = Promise.resolve(true);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  // Récupère les fichiers depuis le backend, triés par matière.
  getFilesFromServer() {
    this.httpClient.get('http://127.0.0.1:5000/api/files').subscribe(
      data => {
        this.files = data as string[];
        this.filesLoaded = Promise.resolve(true);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  // Gère l'affichage de la correction.
  switchToCorrection() {
    this.pdfLoaderService.setPDF(this.anneeTC, this.matiere, this.file + '_c');
  }

  // Gère l'affichage du sujet
  switchToSujet() {
    this.pdfLoaderService.setPDF(this.anneeTC, this.matiere, this.file + '_s');
  }
}
