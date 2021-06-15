import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAdmin : boolean = true;
  ejercicios: any[] = [];
  latestPosts :string [] = []; 

  constructor( private db : FirestoreService, private datePipe: DatePipe) {
    
   }

  ngOnInit(): void {
    this.db.getEjercicios().subscribe((dataEjercicios) => {
      dataEjercicios.forEach((ejercicio: any) => {
        this.ejercicios.push({
          id: ejercicio.payload.doc.id,
          data: ejercicio.payload.doc.data()
        });
      })
      this.loadLatestsPosts();
    });
 
  }

  getImage( ejercicio : any) : string{
    
    let image = "assets/img/letters/png/"+ejercicio.data.creator[0] +".png";
    //console.log(image);
    return image;
  }

  getIcon(ejercicio : any){
    let value = ejercicio.data.section;
    let imgPath : string;
    switch (value) {
      case "Algoritmos numéricos":
            imgPath = "assets/img/AI/png/numericos.png";
            break;
      case  "Listas":
            imgPath = "assets/img/AI/png/listas.png";
            break;
      case  "Condicionales":
            imgPath = "assets/img/AI/png/condicionales.png";
      break;
      case  "Árboles":
            imgPath = "assets/img/AI/png/arboles.png";
        break;
      default:
        
        break;
    }
    return imgPath;

  }

  loadLatestsPosts(){
     
    const formatedDates = this.ejercicios.map(value =>{
      var date = new Date(value.data.created);
      return this.datePipe.transform(date,"yyyy-MM-dd");
    });
    //["yyyy-mm-dd", "yyyy-mm-dd","yyyy-mm-dd"]


  }
  
}

