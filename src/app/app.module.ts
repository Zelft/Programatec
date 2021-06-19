import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import { InicialPipe } from './pipes/inicial.pipe';
import { DatePipe } from '@angular/common';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { EjercicioComponent } from './components/ejercicio/ejercicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    InicialPipe,
    FooterComponent,
    CategoriasComponent,
    EjercicioComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(ROUTES, {useHash : true}),
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
