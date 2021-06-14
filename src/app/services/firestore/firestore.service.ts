import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore
  ) {}
  //Crea un nuevo gato
  public createCat(data: {nombre: string, url: string}) {
    return this.firestore.collection('ejercicios').add(data);
  }
  //Obtiene un gato
  public getEjercicio(documentId: string) {
    return this.firestore.collection('ejercicios').doc(documentId).snapshotChanges();
  }
  //Obtiene todos los gatos
  public getCats() {
    
    return this.firestore.collection('ejercicios').snapshotChanges();
  }
  //Actualiza un gato
  public updateCat(documentId: string, data: any) {
    return this.firestore.collection('cats').doc(documentId).set(data);
  }
}