import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class PdfLoaderService {
  public url: BehaviorSubject<string> = new BehaviorSubject<string>('/assets/accueil.pdf');

  constructor() { }
  setPDF(anneeTC: string, matiere: string, file: string) {
    this.url.next('/assets/' + anneeTC + '/' + matiere + '/' + file);
  }
}
