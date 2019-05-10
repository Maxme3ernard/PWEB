import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfLoaderService {

  constructor() { }
  getPDF():string {
    return '/assets/3TC/TSA/DS/2002-2003/Sujet 2003.pdf';
  }
}
