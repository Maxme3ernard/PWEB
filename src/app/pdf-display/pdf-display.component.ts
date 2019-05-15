import {Component, Input, OnInit} from '@angular/core';
import { PdfLoaderService } from '../services/pdf-loader.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-pdf-display',
  templateUrl: './pdf-display.component.html',
  styleUrls: ['./pdf-display.component.css'],
  providers: [PdfLoaderService]
})
export class PdfDisplayComponent implements OnInit {
  pdfSrc: string;
  @Input() type: string;
  pdfSubscription: Subscription;
  constructor(private pdfLoaderService: PdfLoaderService) { }

  ngOnInit() {
    this.pdfSubscription = this.pdfLoaderService.pdfSubject.subscribe((lien: string) => {this.pdfSrc = lien; });
    this.pdfLoaderService.emitPdf();
    this.pdfSrc = '/assets/undefined';
    // this.pdfSrc = this.pdfLoaderService.getPDF();
  }
  /*onFileSelected() {
    const $img: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer($img.files[0]);
    }
  }*/
}
