import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() ejercicioInfo: any;

  max = 5;
  rate = 0;
  isReadonly = false;

  constructor(private db: FirestoreService) { }
  ngOnInit(): void {
    this.displayRating();
  }

  confirmSelection(event: KeyboardEvent) {
    if (event.keyCode === 13 || event.key === 'Enter') {
      this.isReadonly = false;
      this.ejercicioInfo.data['rating'].push(this.rate);
      this.db.updateEjercicio(this.ejercicioInfo.id, this.ejercicioInfo.data);
    }
  }

  displayRating() {
    let promedio = 0;
    this.ejercicioInfo.data['rating'].forEach(element => {
      promedio += element;
    });
    this.rate = Math.ceil(promedio / (this.ejercicioInfo.data['rating'].length));
  }

}

