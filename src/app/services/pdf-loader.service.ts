import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

// Service récupérant une url qu'il communique au pdf displayer pour l'affichage.
@Injectable()
export class PdfLoaderService {
  public url: BehaviorSubject<string> = new BehaviorSubject<string>('/assets/accueil');
  public currentMatiere: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }
  setPDF(anneeTC: string, matiere: string, file: string) {
    this.url.next('/assets/pdf/' + anneeTC + '/' + matiere + '/' + file);
    this.currentMatiere.next(matiere);
  }
}
