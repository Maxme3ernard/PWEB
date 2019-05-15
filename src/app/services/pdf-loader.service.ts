import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfLoaderService {
  pdfSubject = new Subject();
  private url: string;

  constructor() { }
  getPDF(anneeTC: string, matiere: string, annee: string): string {
    this.url = '/assets/' + anneeTC + '/' + matiere + '/DS/' + annee + '/';
    this.emitPdf();
    return this.url;
  }
  setPDF(anneeTC: string, matiere: string, annee: string) {
    this.url = '/assets/' + anneeTC + '/' + matiere + '/DS/' + annee + '/';
    this.emitPdf();
  }
  emitPdf() {
    this.pdfSubject.next(this.url);
  }
}
