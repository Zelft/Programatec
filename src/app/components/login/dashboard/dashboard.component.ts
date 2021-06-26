import { Component, OnInit } from '@angular/core';
import { NgAuthService } from 'src/app/services/auth/ng-auth.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  ejercicios: any[] = [];
  pageSlice: any[] = [];
  currentElementCounter: number;
  searchExercises: any = [];

  constructor(public ngAuthService: NgAuthService, private db: FirestoreService, private router: Router) { }

  ngOnInit(): void {
    this.db.getEjercicios().subscribe((dataEjercicios) => {
      dataEjercicios.forEach((ejercicio: any) => {
        if(ejercicio.payload.doc.data().created != null){
        
        
        this.ejercicios.push({
          id: ejercicio.payload.doc.id,
          data: ejercicio.payload.doc.data()
        });
      };
      })
      this.pageSlice = this.ejercicios.slice(0, 5);
      this.currentElementCounter = dataEjercicios.length;
    });


  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.ejercicios.length) {
      endIndex = this.ejercicios.length
    }
    this.pageSlice = this.ejercicios.slice(startIndex, endIndex);
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

  getImage(ejercicio: any): string {

    let image = "assets/img/letters/png/" + ejercicio.data.creator[0].toUpperCase() + ".png";
    return image;
  }

  getImageUserImage(name: any) {
    console.log(name);
    return 'assets/img/letters/png/' + name[0].toUpperCase() + '.png';
  }

  verEjercicio(ejercicio: any) {
    this.router.navigate(['/ejercicio', ejercicio.id])
  }

  likeExercise(ejercicio: any) {
    ejercicio.data.likes += 1;
    this.db.updateEjercicio(ejercicio.id, ejercicio.data);
  }

  navegarNuevoEjercicio() {
    this.router.navigate(['/nuevoEjercicio'])
  }

  buscar(termino: string) {
    this.searchExercises = [];
    const array = this.ejercicios;
    let busqueda = termino.toLocaleLowerCase();

    array.forEach(element => {
      if (element.data.name.toLocaleLowerCase().includes(busqueda) || (element.data.section.toLocaleLowerCase().includes(busqueda)) || (element.data.details.toLocaleLowerCase().includes(busqueda))) {
        this.searchExercises.push(element);
      }
    })
    this.pageSlice = this.searchExercises.slice(0, 5);
    this.currentElementCounter = this.searchExercises.length;
  }

  deleteExercise(ejercicio: string) {
    console.log(ejercicio);
  }
}