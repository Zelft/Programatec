import { Routes } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { EjercicioComponent } from './components/ejercicio/ejercicio.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/login/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { SignInComponent } from './components/login/sign-in/sign-in.component';
import { SignUpComponent } from './components/login/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/login/verify-email/verify-email.component';
import { AuthGuard } from "./auth.guard";



export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'categorias', component: CategoriasComponent },
    { path: 'ejercicio/:id', component: EjercicioComponent },
    { path: 'categoria/:tipoCategoria', component: CategoriaComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'email-verification', component: VerifyEmailComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];
