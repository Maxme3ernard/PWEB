import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class PdfLoaderService {
  public url: BehaviorSubject<string> = new BehaviorSubject<string>('/assets/accueil');

  constructor() { }
  setPDF(anneeTC: string, matiere: string, annee: string) {
    this.url.next('/assets/' + anneeTC + '/' + matiere + '/DS' + annee);
  }
}
