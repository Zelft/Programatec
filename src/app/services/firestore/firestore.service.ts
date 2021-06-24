import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore
  ) {}
  //Crea un nuevo ejercicio
  public createEjercicio(data: {call: string, creator: string, code : string, examples : any, solution : any, level :string, created: string, name : string, section : string, details : string}) {
    return this.firestore.collection('ejercicios').add(data);
  }
  //Obtiene un ejercicio
  public getEjercicio(documentId: string) {
    return this.firestore.collection('ejercicios').doc(documentId).snapshotChanges();
  }
  //Obtiene todos los ejercicios
  public getEjercicios() {
    
    return this.firestore.collection('ejercicios').snapshotChanges();
  }
  //Actualiza un ejercicio
  public updateEjercicio(documentId: string, data : {call: string, creator: string, code : string, examples : any, solution : any, level :string, created: Date, name : string, section : string, details : string}) {
    return this.firestore.collection('ejercicios').doc(documentId).set(data);
  }
}