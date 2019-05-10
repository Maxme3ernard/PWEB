import {Component, Input, OnInit} from '@angular/core';
import { PdfLoaderService } from '../services/pdf-loader.service';

@Component({
  selector: 'app-pdf-display',
  templateUrl: './pdf-display.component.html',
  styleUrls: ['./pdf-display.component.css'],
  providers: [PdfLoaderService]
})
export class PdfDisplayComponent implements OnInit {
  @Input() pdfSrc: string;
  constructor(private pdfLoaderService: PdfLoaderService) { }

  ngOnInit() {
    // this.pdfSrc = this.pdfLoaderService.getPDF();
  }
  onFileSelected() {
    const $img: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer($img.files[0]);
    }
  }
}
