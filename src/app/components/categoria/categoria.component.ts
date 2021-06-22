import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  ejercicios: any[] = [];
  pageSlice: any[] = [];
  currentElementCounter: number;
  section: string = "";

  constructor(private activatedRoute: ActivatedRoute, private db: FirestoreService, private router: Router) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.tipoCategoria == "listas") {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().section == "Listas, vectores y matrices") {
              this.ejercicios.push(ejercicio);
              this.section = this.ejercicios[0].payload.doc.data().section;

            }
          });
        })
      }
      else if (params.tipoCategoria == "condicionales") {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().section == "Condicionales") {
              this.ejercicios.push(ejercicio);
              this.section = this.ejercicios[0].payload.doc.data().section;
            }
          });
        })
      }
      else if (params.tipoCategoria == "numericos") {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().section == "Algoritmos numéricos") {
              this.ejercicios.push(ejercicio);
              this.section = this.ejercicios[0].payload.doc.data().section;
            }
          });
        })
      } else {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().section == "Árboles") {
              this.ejercicios.push(ejercicio);
              this.section = this.ejercicios[0].payload.doc.data().section;
            }
          });
        })
      }
    });
    console.log(this.ejercicios);


  }

  getIcon(ejercicio: any) {
    let value = ejercicio.payload.doc.data().section;
    let imgPath: string;
    switch (value) {
      case "Algoritmos numéricos":
        imgPath = "assets/img/AI/png/numericos.png";
        break;
      case "Listas":
        imgPath = "assets/img/AI/png/listas.png";
        break;
      case "Condicionales":
        imgPath = "assets/img/AI/png/condicionales.png";
        break;
      case "Árboles":
        imgPath = "assets/img/AI/png/arboles.png";
        break;
      default:
        break;
    }
    return imgPath;
  }

  getImage(ejercicio: any): string {
    let image = "assets/img/letters/png/" + ejercicio.payload.doc.data().creator[0].toUpperCase() + ".png";
    return image;
  }

  verEjercicio(ejercicio: any) {
    this.router.navigate(['/ejercicio', ejercicio.payload.doc.id])
  }

  likeExercise(ejercicio: any) {
    ejercicio.data.likes += 1;
    this.db.updateEjercicio(ejercicio.id, ejercicio.data);
  }

}
