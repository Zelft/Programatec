import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseStorageService } from 'src/app/services/storage/firebase-storage.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import Swal from 'sweetalert2';


@Component({
   selector: 'app-nuevo-ejercicio',
   templateUrl: './nuevo-ejercicio.component.html',
   styleUrls: ['./nuevo-ejercicio.component.css']
})
export class NuevoEjercicioComponent implements OnInit {

   name = 'Angular';
   exerciseForm: FormGroup = null;
   levels: any = ['1', '2', '3', '4', '5'];
   categories: any = ['Listas, vectores y matrices', 'Condicionales', ' Algoritmos numéricos', 'Árboles'];
   currentCode: any = 0;
   sent: boolean = false;
   //ejercicios : any[] = [];

   //Informacion de Archivo de Subida
   public mensajeArchivo = 'No hay un archivo seleccionado';
   public datosFormulario = new FormData();
   public nombreArchivo = '';
   public URLPublica = '';
   public porcentaje = 0;
   public finalizado = false;

   constructor(private fb: FormBuilder, private db: FirestoreService, private datePipe: DatePipe, private firebaseStorage: FirebaseStorageService) {

      this.exerciseForm = this.fb.group({
         call: ["", Validators.required],
         creator: ["", Validators.required],
         details: ["", Validators.required],
         examples: this.fb.array([]),
         level: ["", Validators.required],
         name: ["", Validators.required],
         section: ["", Validators.required],
         codeSolution: ["", Validators.required],
         inputs: this.fb.array([]),
         outputs: this.fb.array([]),
      });
   }
   ngOnInit(): void {
      this.db.getEjercicios().subscribe((dataEjercicios) => {
         let sortedArray = [...dataEjercicios];

         let sortedExercises = dataEjercicios.slice().sort((a, b) => b.payload.doc.data()['code'] - a.payload.doc.data()['code']);

         this.currentCode = ++sortedExercises[0].payload.doc.data()['code'];
      });
   }

   //Examples
   examples(): FormArray {
      return this.exerciseForm.get("examples") as FormArray
   }

   newExample(): FormGroup {
      return this.fb.group({
         call: '',
         comment: '',
         result: '',
      })
   }

   addExample() {
      this.examples().push(this.newExample());
   }
   removeExample(i: number) {
      this.examples().removeAt(i);
   }

   //inputs
   inputs(): FormArray {
      return this.exerciseForm.get("inputs") as FormArray
   }

   newInput(): FormGroup {
      return this.fb.group({
         name: '',
         type: '',
      })
   }

   addInput() {
      this.inputs().push(this.newInput());
   }

   removeInput(i: number) {
      this.inputs().removeAt(i);
   }

   //outputs
   outputs(): FormArray {
      return this.exerciseForm.get("outputs") as FormArray
   }

   newOutput(): FormGroup {
      return this.fb.group({
         name: '',
         type: '',
      })
   }

   addOutput() {
      this.outputs().push(this.newInput());
   }

   removeOutput(i: number) {
      this.outputs().removeAt(i);
   }

   //Submit
   onSubmit() {
      if (this.exerciseForm.valid) {
         if (this.nombreArchivo == "" || !this.sent) {
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'No has subido el archivo seleccionado. Intenta de nuevo!'
            })
         } else {
            let currentDate = new Date();
            let ejercicio = {
               call: this.exerciseForm.get('call').value,
               code: this.currentCode,
               created: this.datePipe.transform(currentDate, "yyyy-MM-dd"),
               creator: this.exerciseForm.get('creator').value,
               details: this.exerciseForm.get('details').value,
               examples: this.exerciseForm.get('examples').value,
               level: this.exerciseForm.get('level').value,
               likes: 0,
               rating: [],
               name: this.exerciseForm.get('name').value,
               section: this.exerciseForm.get('section').value,
               solution: {
                  code: this.exerciseForm.get('codeSolution').value,
                  inputs: this.exerciseForm.get('inputs').value,
                  outputs: this.exerciseForm.get('outputs').value,
               },
               archivosSubidos: this.URLPublica
            }
            Swal.fire(
               'Ejercicio agregado!',
               'El ejercicio se ha guardado exitosamente!',
               'success'
            );
            this.db.createEjercicio(ejercicio);
            this.exerciseForm.reset();
         }
      } else {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Favor llenar todos los campos del formulario'
         })
      }
   }

   /* FUNCIONES DE SUBIDA DE ARCHIVO A FIREBASE*/

   public archivoForm = new FormGroup({
      archivo: new FormControl(null, Validators.required),
   });

   //Evento que se gatilla cuando el input de tipo archivo cambia
   public cambioArchivo(event) {
      if (event.target.files.length > 0) {
         for (let i = 0; i < event.target.files.length; i++) {
            this.mensajeArchivo = `Archivo : ${event.target.files[i].name}`;
            this.nombreArchivo = event.target.files[i].name;
            this.datosFormulario.delete('archivo');
            this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)
         }
      } else {
         this.mensajeArchivo = 'No hay un archivo seleccionado';
      }
   }

   //Sube el archivo a Cloud Storage
   public subirArchivo() {
      let archivo = this.datosFormulario.get('archivo');
      let referencia = this.firebaseStorage.referenciaCloudStorage(this.nombreArchivo);
      let tarea = this.firebaseStorage.tareaCloudStorage(this.nombreArchivo, archivo);

      setTimeout(() => {
         referencia.getDownloadURL().subscribe((URL) => {
            this.URLPublica = URL;
            console.log(this.URLPublica);
            this.sent = true;
         });
      }, 2000);

      Swal.fire(
         'Archivo subido con éxito',
         'El archivo se ha subido',
         'success'
      )


   }

   invalid(campo: any | null): boolean {
      return campo?.touched && campo?.invalid;
   }

   valid(campo: any | null): boolean {
      return campo?.touched && campo?.valid;
   }

   f(campo: any) {
      return this.exerciseForm.get(campo);
   }

}
