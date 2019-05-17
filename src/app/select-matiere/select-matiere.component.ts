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
  constructor(private pdfLoaderService: PdfLoaderService, private httpClient: HttpClient) { }
  ngOnInit() {
    this.getFilesFromServer();
    this.getMatieresFromServer();
  }
  onSubmit(form: NgForm) {
    const anneeTC = form.value.anneeTC;
    const matiere = form.value.matiere;
    const file = form.value.file;
    this.pdfLoaderService.setPDF(anneeTC, matiere, file);
  }
  getMatieresFromServer() {
    this.httpClient.get('http://127.0.0.1:5000/api/matieres').subscribe(
      data => {
        this.matieres = data as string [];
        console.log(this.files['PWEB']);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
  getFilesFromServer() {
    this.httpClient.get('http://127.0.0.1:5000/api/files').subscribe(
      data => {
        this.files = data as string [];
        console.log(this.matieres['3TC']);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
}
