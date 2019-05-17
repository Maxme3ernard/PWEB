import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class PdfLoaderService {
  public url: BehaviorSubject<string> = new BehaviorSubject<string>('/assets/accueil');

  constructor(private httpClient: HttpClient) { }
  setPDF(anneeTC: string, matiere: string, file: string) {
    this.url.next('/assets/' + anneeTC + '/' + matiere + '/' + file);
  }
}
