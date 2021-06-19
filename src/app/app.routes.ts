import { Routes } from '@angular/router';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { EjercicioComponent } from './components/ejercicio/ejercicio.component';
import { HomeComponent } from './components/home/home.component';



export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'categorias', component: CategoriasComponent },
    { path: 'ejercicio/:id', component: EjercicioComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
