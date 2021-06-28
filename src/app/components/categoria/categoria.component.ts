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
  searchExercises: any = [];

  constructor(private activatedRoute: ActivatedRoute, private db: FirestoreService, private router: Router) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.tipoCategoria == "listas") {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().section == "Listas, vectores y matrices") {
              this.exercises.push({
                id: ejercicio.payload.doc.id,
                data: ejercicio.payload.doc.data()
              });
              this.section = this.exercises[0].data.section;
            }
          });
          this.pageSlice = this.exercises.slice(0, 5);
          this.currentElementCounter = this.exercises.length;
          console.log(this.pageSlice);
        })
      }
      else if (params.tipoCategoria == "condicionales") {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          this.exercises = [];
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().section == "Condicionales") {
              this.exercises.push({
                id: ejercicio.payload.doc.id,
                data: ejercicio.payload.doc.data()
              });
              this.section = this.exercises[0].data.section;
            }
          });
          this.pageSlice = this.exercises.slice(0, 5);
          this.currentElementCounter = this.exercises.length;
          console.log(this.currentElementCounter);
        })
      }
      else if (params.tipoCategoria == "numericos") {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          this.exercises = [];
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().section == "Algoritmos numéricos") {
              if (ejercicio.payload.doc.data().created != null) {
                this.exercises.push({
                  id: ejercicio.payload.doc.id,
                  data: ejercicio.payload.doc.data()
                });
                this.section = this.exercises[0].data.section;
              }

            }
          });
          this.pageSlice = this.exercises.slice(0, 5);
          this.currentElementCounter = this.exercises.length;
        })
      } else {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          this.exercises = [];
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().section == "Árboles") {
              this.exercises.push({
                id: ejercicio.payload.doc.id,
                data: ejercicio.payload.doc.data()
              });
              this.section = this.exercises[0].data.section;
            }
          });
          this.pageSlice = this.exercises.slice(0, 5);
          this.currentElementCounter = this.exercises.length;
        })
      }
    });
    

  }

  getIcon(ejercicio: any) {
    let value = ejercicio.data.section;
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

  
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.exercises.length) {
       endIndex = this.exercises.length
    }
    this.pageSlice = this.exercises.slice(startIndex, endIndex);
 }

  getImage(ejercicio: any): string {
    let image = "assets/img/letters/png/" + ejercicio.data.creator[0].toUpperCase() + ".png";
    return image;
  }

  verEjercicio(ejercicio: any) {
    this.router.navigate(['/ejercicio', ejercicio.id])
  }

  likeExercise(ejercicio: any) {
    ejercicio.data.likes += 1;
    this.db.updateEjercicio(ejercicio.id, ejercicio.data);
  }

  buscar(termino: string) {
    this.searchExercises = [];
    const array = this.exercises;
    let busqueda = termino.toLocaleLowerCase();

    array.forEach(element => {
      if (element.data.name.toLocaleLowerCase().includes(busqueda) || (element.data.section.toLocaleLowerCase().includes(busqueda)) || (element.data.details.toLocaleLowerCase().includes(busqueda))) {
        this.searchExercises.push(element);
      }
    })
    this.pageSlice = this.searchExercises.slice(0, 5);
    console.log(this.pageSlice);
    this.currentElementCounter = this.searchExercises.length;
  }

}
