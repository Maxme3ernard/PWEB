import {Component, Injectable, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PdfLoaderService} from '../services/pdf-loader.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-select-matiere',
  templateUrl: './select-matiere.component.html',
  styleUrls: ['./select-matiere.component.css']
})

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

  filesLoaded: Promise<boolean>;
  matieresLoaded: Promise<boolean>;

  constructor(private pdfLoaderService: PdfLoaderService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.getFilesFromServer();
    this.getMatieresFromServer();
  }

  onSubmit(form: NgForm) {
    this.anneeTC = form.value.anneeTC;
    this.matiere = form.value.matiere;
    this.file = form.value.file;
    this.pdfLoaderService.setPDF(this.anneeTC, this.matiere, this.file + '_s');
  }
  getMatieresFromServer() {
    this.httpClient.get('http://127.0.0.1:5000/api/matieres').subscribe(
      data => {
        this.matieres = data as string [];
        this.matieresLoaded = Promise.resolve(true);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
  getFilesFromServer() {
    this.httpClient.get('http://127.0.0.1:5000/api/files').subscribe(
      data => {
        this.files = data as string[];
        this.filesLoaded = Promise.resolve(true);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
  switchToCorrection() {
    this.pdfLoaderService.setPDF(this.anneeTC, this.matiere, this.file + '_c');
  }
  switchToSujet() {
    this.pdfLoaderService.setPDF(this.anneeTC, this.matiere, this.file + '_s');
  }
}
