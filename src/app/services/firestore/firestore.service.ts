import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore
  ) { }

  //Crea un nuevo ejercicio
  public createEjercicio(ejercicio : any) {
    return this.firestore.collection('ejercicios').add(ejercicio);
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
  public updateEjercicio(documentId: string, data: any) {
    return this.firestore.collection('ejercicios').doc(documentId).set(data);
  }

  //Eliminar ejercicio
  public deleteEjercicio(documentId: string) {
    return this.firestore.collection('ejercicios').doc(documentId).delete();
  }

}