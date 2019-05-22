import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class PdfLoaderService {
  public url: BehaviorSubject<string> = new BehaviorSubject<string>('/assets/accueil');
  public currentMatiere: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }
  setPDF(anneeTC: string, matiere: string, file: string) {
    this.url.next('/assets/' + anneeTC + '/' + matiere + '/' + file);
    this.currentMatiere.next(matiere);
  }
}
