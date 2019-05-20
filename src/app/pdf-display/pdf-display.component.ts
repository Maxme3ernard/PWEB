import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PdfLoaderService} from '../services/pdf-loader.service';


@Component({
  selector: 'app-pdf-display',
  templateUrl: './pdf-display.component.html',
  styleUrls: ['./pdf-display.component.css']
})
export class PdfDisplayComponent implements OnInit {
  pdfSrc: string;
  constructor(private pdfLoaderService: PdfLoaderService) {
    this.pdfLoaderService.url.subscribe( value => {
      this.pdfSrc = value + '.pdf';
    });
  }

  ngOnInit() {
    // this.pdfSubscription = this.pdfLoaderService.pdfSubject.subscribe((lien: string) => {this.pdfSrc = lien; });
    // this.pdfLoaderService.emitPdf();
    // this.pdfSrc = 'assets/accueil';
  }

}
