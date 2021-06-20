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
        this.ejercicio = dataEjercicio.payload.data();
      });
    })
  }

  downloadCode() {
  }

  ngOnInit(): void {


  }
}
