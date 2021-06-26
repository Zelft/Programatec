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
  exercises: any[] = [];
  pageSlice: any[] = [];
  currentElementCounter: number;
  section: string = "";

  constructor(private activatedRoute: ActivatedRoute, private db: FirestoreService, private router: Router) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      if (params.tipoCategoria == "listas") {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().section == "Listas, vectores y matrices") {
              this.exercises.push(ejercicio);
              this.section = this.exercises[0].payload.doc.data().section;

            }
          });
          
        })
      }
      else if (params.tipoCategoria == "condicionales") {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          this.exercises = [];
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().section == "Condicionales") {
              this.exercises.push(ejercicio);
              this.section = this.exercises[0].payload.doc.data().section;
            }
          });
        })
      }
      else if (params.tipoCategoria == "numericos") {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          this.exercises = [];
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().section == "Algoritmos numéricos") {
              if(ejercicio.payload.doc.data().created != null){
                console.log(ejercicio.payload.doc.id);
                this.exercises.push(ejercicio);
                this.section = this.exercises[0].payload.doc.data().section;
              }
              
            }
          });
        })
      } else {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          this.exercises = [];
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().section == "Árboles") {
              this.exercises.push(ejercicio);
              this.section = this.exercises[0].payload.doc.data().section;
            }
          });
        })
      }
    });
    console.log(this.exercises);


  }

  getIcon(ejercicio: any) {
    let value = ejercicio.payload.doc.data().section;
    let imgPath: string;
    switch (value) {
      case "Algoritmos numéricos":
        imgPath = "assets/img/AI/png/numericos.png";
        break;
      case "Listas, vectores y matrices":
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
    
    ejercicio.payload.doc.data()['likes'] +=1;
    //ejercicio.data.likes += 1;
    console.log(this.exercises[0].payload.doc.data());
    console.log(ejercicio.payload.doc.data());
    //this.db.updateEjercicio(ejercicio.id, ejercicio.data);
  }

}
