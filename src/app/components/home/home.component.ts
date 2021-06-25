import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { DatePipe } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAdmin: boolean = true;
  ejercicios: any[] = [];
  latestPosts: string[] = [];
  topLiked: any[] = [];
  pageSlice: any[] = [];
  sortedDates: any = [];
  currentElementCounter: number;
  searchExercises: any = [];

  constructor(private db: FirestoreService, private datePipe: DatePipe, private router: Router) {

  }

  ngOnInit(): void {
    this.db.getEjercicios().subscribe((dataEjercicios) => {
      dataEjercicios.forEach((ejercicio: any) => {
        this.ejercicios.push({
          id: ejercicio.payload.doc.id,
          data: ejercicio.payload.doc.data()
        });
      })
      console.log(this.ejercicios);
      this.getTopLikedPosts();
      this.pageSlice = this.ejercicios.slice(0, 5);
      this.currentElementCounter = dataEjercicios.length;
      this.orderDates();
    });

  }

  getImage(ejercicio: any): string {

    let image = "assets/img/letters/png/" + ejercicio.data.creator[0].toUpperCase() + ".png";
    return image;
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

  loadLatestsPosts() {

    const formatedDates = this.ejercicios.map(value => {
      var date = new Date(value.data.created);
      return this.datePipe.transform(date, "yyyy-MM-dd");
    });
    //["yyyy-mm-dd", "yyyy-mm-dd","yyyy-mm-dd"]
  }

  likeExercise(ejercicio: any) {
    ejercicio.data.likes += 1;
    this.db.updateEjercicio(ejercicio.id, ejercicio.data);
  }

  getTopLikedPosts() {
    this.topLiked = [...this.ejercicios];
    this.topLiked.sort(function (a, b) {
      return a.data.likes - b.data.likes;
    });
    this.topLiked = this.topLiked.reverse().slice(0, 10);
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.ejercicios.length) {
      endIndex = this.ejercicios.length
    }
    this.pageSlice = this.ejercicios.slice(startIndex, endIndex);
  }

  buscar(termino: string) {
    this.searchExercises = [];
    const array = this.ejercicios;
    let busqueda = termino.toLocaleLowerCase();

    array.forEach(element => {
      if (element.data.name.toLocaleLowerCase().includes(busqueda) || (element.data.section.toLocaleLowerCase().includes(busqueda))) {
        this.searchExercises.push(element);
      }
    })
    this.pageSlice = this.searchExercises.slice(0, 5);
    this.currentElementCounter = this.searchExercises.length;
  }

  verEjercicio(ejercicio: any) {
    this.router.navigate(['/ejercicio', ejercicio.id])
  }

  orderDates() {
    let modifiedDates = [...this.ejercicios];
    for (let index = 0; index < this.ejercicios.length; index++) {
      modifiedDates[index].data.created = new Date(modifiedDates[index].data.created);
    }

    this.sortedDates = modifiedDates.slice().sort((a, b) => b.data.created - a.data.created).slice(0, 10);
  }


}

