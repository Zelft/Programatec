import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.css']
})
export class EjercicioComponent implements OnInit {
  ejercicio: any = {};

  constructor(private activatedRoute: ActivatedRoute, private db: FirestoreService) {
    this.activatedRoute.params.subscribe(params => {
      this.db.getEjercicio(params.id).subscribe((dataEjercicio) => {
        this.ejercicio = dataEjercicio;
      });
    })
  }

  downloadCode(ejercicio: any) {

  }

  ngOnInit(): void {

  }

  ejercicios: any = [
    {
      nombre: 'Ejemplo 1',
      puntaje: 5,
      id: 1,
      code: "def sumaDigitosConSigno(num):\n\n    resultado = 0\n    while  num > 0 :\n        if num % 2 == 0:\n            resultado = resultado + num%10\n        else:\n            resultado = resultado - num%10\n        num = num\/\/10\n    return resultado"
    }]
}
