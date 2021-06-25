import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html',
  styleUrls: ['./nivel.component.css']
})
export class NivelComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private db: FirestoreService, private router: Router) { }
  ejercicios: any[] = [];
  nivelS: string = "";



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.tipoNivel == "1") {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().level == "1") {
              this.ejercicios.push(ejercicio);
              this.nivelS = this.ejercicios[0].payload.doc.data().level;
            }
          });
        })
      }
      else if (params.tipoNivel == "2") {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().level == "2") {
              this.ejercicios.push(ejercicio);
              this.nivelS = this.ejercicios[0].payload.doc.data().level;
            }
          });
        })
      }
      else if (params.tipoNivel == "3") {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().level == "3") {
              this.ejercicios.push(ejercicio);
              this.nivelS = this.ejercicios[0].payload.doc.data().level;
            }
          });
        })
      }
      else if (params.tipoNivel == "4") {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().level == "4") {
              this.ejercicios.push(ejercicio);
              this.nivelS = this.ejercicios[0].payload.doc.data().level;
            }
          });
        })
      } else {
        this.db.getEjercicios().subscribe((dataEjercicios) => {
          dataEjercicios.forEach((ejercicio: any) => {
            if (ejercicio.payload.doc.data().level == "5") {
              this.ejercicios.push(ejercicio);
              this.nivelS = this.ejercicios[0].payload.doc.data().level;
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
    ejercicio.data.likes += 1;
    this.db.updateEjercicio(ejercicio.id, ejercicio.data);
  }

}
