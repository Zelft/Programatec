import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html',
  styleUrls: ['./nivel.component.css']
})
export class NivelComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private db: FirestoreService, private router: Router) { }
  ejercicios: any[] = [];
  pageSlice: any[] = [];
  currentElementCounter: number;
  nivelS: string = "";



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.tipoNivel == "1") {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().level == "1") {
              this.ejercicios.push({
                id: ejercicio.payload.doc.id,
                data: ejercicio.payload.doc.data()
              });
              this.nivelS = this.ejercicios[0].data.level;
            }
          });
          this.pageSlice = this.ejercicios.slice(0, 5);
          this.currentElementCounter = this.ejercicios.length;
        })
      }
      else if (params.tipoNivel == "2") {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().level == "2") {
              this.ejercicios.push({
                id: ejercicio.payload.doc.id,
                data: ejercicio.payload.doc.data()
              });
              this.nivelS = this.ejercicios[0].data.level;
            }
          });
          this.pageSlice = this.ejercicios.slice(0, 5);
          this.currentElementCounter = this.ejercicios.length;
        })
      }
      else if (params.tipoNivel == "3") {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().level == "3") {
              this.ejercicios.push({
                id: ejercicio.payload.doc.id,
                data: ejercicio.payload.doc.data()
              });
              this.nivelS = this.ejercicios[0].data.level;
            }
          });
          this.pageSlice = this.ejercicios.slice(0, 5);
          this.currentElementCounter = this.ejercicios.length;
        })
      }
      else if (params.tipoNivel == "4") {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().level == "4") {
              this.ejercicios.push({
                id: ejercicio.payload.doc.id,
                data: ejercicio.payload.doc.data()
              });
              this.nivelS = this.ejercicios[0].data.level;
            }
          });
          this.pageSlice = this.ejercicios.slice(0, 5);
          this.currentElementCounter = this.ejercicios.length;
        })
      } else {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().level == "5") {
              this.ejercicios.push({
                id: ejercicio.payload.doc.id,
                data: ejercicio.payload.doc.data()
              });
              this.nivelS = this.ejercicios[0].data.level;
            }
          });
          this.pageSlice = this.ejercicios.slice(0, 5);
          this.currentElementCounter = this.ejercicios.length;
        })
      }
    });
  }

  getIcon(ejercicio: any) {
    let value = ejercicio.data.section;
    let imgPath: string;
    switch (value) {
      case "Algoritmos num??ricos":
        imgPath = "assets/img/AI/png/numericos.png";
        break;
      case "Listas, vectores y matrices":
        imgPath = "assets/img/AI/png/listas.png";
        break;
      case "Condicionales":
        imgPath = "assets/img/AI/png/condicionales.png";
        break;
      case "??rboles":
        imgPath = "assets/img/AI/png/arboles.png";
        break;
      default:
        break;
    }
    return imgPath;
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


  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.ejercicios.length) {
      endIndex = this.ejercicios.length
    }
    this.pageSlice = this.ejercicios.slice(startIndex, endIndex);
  }

}
