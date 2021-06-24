import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})

export class CategoriasComponent implements OnInit {
  constructor(private router: ActivatedRoute, private db: FirestoreService, private router2: Router) { }
  arboles: any[] = [];
  numericos: any[] = [];
  listas: any[] = [];
  condicionales: any[] = [];

  ngOnInit(): void {
    this.dividirEnCategorias()
  }

  dividirEnCategorias() {
    this.db.getEjercicios().subscribe((dataEjercicios) => {
      dataEjercicios.forEach((ejercicio: any) => {
        if (ejercicio.payload.doc.data().section == "Condicionales") {
          this.condicionales.push(ejercicio.payload.doc.data());
        }
        else if (ejercicio.payload.doc.data().section == "Listas, vectores y matrices") {
          this.listas.push(ejercicio.payload.doc.data());
        }
        else if (ejercicio.payload.doc.data().section == "Algoritmos numéricos") {
          this.numericos.push(ejercicio.payload.doc.data());
        }
        else {
          this.arboles.push(ejercicio.payload.doc.data());
        }
      });
    })
  };

  verEjerciciosCategoria(categoria: string) {
    this.router2.navigate(['/categoria', categoria])
  }
}