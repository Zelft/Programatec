import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styleUrls: ['./niveles.component.css']
})
export class NivelesComponent implements OnInit {

  constructor(private db: FirestoreService, private router: Router) { }
  nivel1: number = 0;
  nivel2: number = 0;
  nivel3: number = 0;
  nivel4: number = 0;
  nivel5: number = 0;

  ngOnInit(): void {
    this.cantidadPorNiveles()
  }

  cantidadPorNiveles() {
    this.db.getEjercicios().subscribe((dataEjercicios) => {
      dataEjercicios.forEach((ejercicio: any) => {
        if (ejercicio.payload.doc.data().level == "1") {
          this.nivel1 += 1;
        }
        else if (ejercicio.payload.doc.data().level == "2") {
          this.nivel2 += 1;
        }
        else if (ejercicio.payload.doc.data().level == "3") {
          this.nivel3 += 1;
        }
        else if (ejercicio.payload.doc.data().level == "4") {
          this.nivel4 += 1;
        }
        else {
          this.nivel5 += 1;
        }
      });
    })
  };

  verEjerciciosNivel(nivel: string) {
    this.router.navigate(['/nivel', nivel])
  }

}
