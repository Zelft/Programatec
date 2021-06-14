import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAdmin : boolean = true;
  items :  Observable<any[]>;
  ejercicios : any = [];

  constructor( private db : AngularFirestore) {
    this.items = this.db.collection('ejercicios').valueChanges();
   }

  ngOnInit(): void {
    
  }

  loadJsonPayload () : void{
    console.log(this.items);
  }
}

