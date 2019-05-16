import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import { PdfDisplayComponent } from './pdf-display/pdf-display.component';
import {FormsModule} from '@angular/forms';
import { SelectMatiereComponent } from './select-matiere/select-matiere.component';
import {PdfLoaderService} from './services/pdf-loader.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    PdfDisplayComponent,
    SelectMatiereComponent,
  ],
  imports: [
    BrowserModule,
    PdfViewerModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PdfLoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }

