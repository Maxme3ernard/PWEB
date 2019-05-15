import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {PdfLoaderService} from '../services/pdf-loader.service';

@Component({
  selector: 'app-select-matiere',
  templateUrl: './select-matiere.component.html',
  styleUrls: ['./select-matiere.component.css']
})
export class SelectMatiereComponent implements OnInit {

  constructor(private pdfLoaderService: PdfLoaderService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    const anneeTC = form.value.anneeTC;
    const matiere = form.value.matiere;
    const annee = form.value.annee;
    this.pdfLoaderService.setPDF(anneeTC, matiere, annee);
  }
}
