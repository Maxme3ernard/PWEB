import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import { PdfDisplayComponent } from './pdf-display/pdf-display.component';
import {FormsModule} from '@angular/forms';
import { SelectMatiereComponent } from './select-matiere/select-matiere.component';
import {PdfLoaderService} from './services/pdf-loader.service';
import {HttpClientModule} from '@angular/common/http';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import {RouterModule} from '@angular/router';
import {AuthService} from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    PdfDisplayComponent,
    SelectMatiereComponent,
    ChatComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    PdfViewerModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent }
    ])
  ],
  providers: [PdfLoaderService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

