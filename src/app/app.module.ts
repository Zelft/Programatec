import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from '../environments/environment';
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import { InicialPipe } from './pipes/inicial.pipe';
import { DatePipe } from '@angular/common';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { EjercicioComponent } from './components/ejercicio/ejercicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { DashboardComponent } from './components/login/dashboard/dashboard.component';
import { SignInComponent } from './components/login/sign-in/sign-in.component';
import { SignUpComponent } from './components/login/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/login/verify-email/verify-email.component';
import { NgAuthService } from "./services/auth/ng-auth.service";
import { NuevoEjercicioComponent } from './components/nuevo-ejercicio/nuevo-ejercicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NivelesComponent } from './components/niveles/niveles.component';
import { NivelComponent } from './components/nivel/nivel.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    InicialPipe,
    FooterComponent,
    CategoriasComponent,
    EjercicioComponent,
    CategoriaComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    NuevoEjercicioComponent,
    NivelesComponent,
    NivelComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(ROUTES, { useHash: true }),
    BrowserAnimationsModule,
    MatPaginatorModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe, NgAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
