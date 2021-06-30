import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseStorageService } from 'src/app/services/storage/firebase-storage.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-ejercicio',
  templateUrl: './editar-ejercicio.component.html',
  styleUrls: ['./editar-ejercicio.component.css']
})
export class EditarEjercicioComponent implements OnInit {


  name = 'Angular';
  exerciseForm: FormGroup = null;
  levels: any = ['1', '2', '3', '4', '5'];
  categories: any = ['Listas, vectores y matrices', 'Condicionales', ' Algoritmos numéricos', 'Árboles'];
  currentCode: any = 0;
  currentLevel: any = 0;
  likes: any = 0;
  rating: any = [];
  sent: boolean = false;
  //ejercicios : any[] = [];

  //Informacion de Archivo de Subida
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;
  ejercicioID: string = '';

  constructor(private fb: FormBuilder, private db: FirestoreService, private datePipe: DatePipe, private firebaseStorage: FirebaseStorageService, private activatedRoute: ActivatedRoute) {

    this.exerciseForm = this.fb.group({
      call: '',
      creator: '',
      details: '',
      examples: this.fb.array([]),
      code: '',
      level: [''],
      name: '',
      section: [''],
      codeSolution: '',
      inputs: this.fb.array([]),
      outputs: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.ejercicioID = params.id;
      this.fillCurrentForm();
      //this.reload();
    });
  }

  fillCurrentForm() {

    let ejercicio: any;
    this.db.getEjercicio(this.ejercicioID).subscribe((exe) => {
      ejercicio = exe.payload.data();
      this.exerciseForm.controls['call'].setValue(ejercicio.call);
      this.exerciseForm.controls['name'].setValue(ejercicio.name);
      this.exerciseForm.controls['creator'].setValue(ejercicio.creator);
      this.exerciseForm.controls['details'].setValue(ejercicio.details);
      this.exerciseForm.controls['call'].setValue(ejercicio.call);
      this.exerciseForm.controls['section'].setValue(ejercicio.section);
      this.exerciseForm.controls['level'].setValue(ejercicio.level);
      this.currentCode = ejercicio.code;
      //this.currentLevel = ejercicio.level;
      this.rating = ejercicio.rating;
      this.likes = ejercicio.likes;
      this.exerciseForm.controls['code'].setValue(ejercicio.code);
      exe.payload.data()['examples'].forEach(element => {
        let val = this.addExample();
        val.controls['call'].setValue(element.call);
        val.controls['comment'].setValue(element.comment);
        val.controls['result'].setValue(element.result);
      });
      this.exerciseForm.controls['codeSolution'].setValue(ejercicio.solution.code);
      exe.payload.data()['solution'].inputs.forEach(element => {
        let val = this.addInput();
        val.controls['name'].setValue(element.name);
        val.controls['type'].setValue(element.type);

      });
      exe.payload.data()['solution'].outputs.forEach(element => {
        let val = this.addOutput();
        val.controls['name'].setValue(element.name);
        val.controls['type'].setValue(element.type);
      });

    })

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
    let exam = this.newExample();
    this.examples().push(exam);
    return exam;
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
    let val = this.newInput();
    this.inputs().push(val);
    return val;
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
    let val = this.newOutput();
    this.outputs().push(val);
    return val;
  }

  removeOutput(i: number) {
    this.outputs().removeAt(i);
  }

  //Submit
  onSubmit() {

    if ((this.sent && this.nombreArchivo != '') || (this.nombreArchivo == '')) {
      let currentDate = new Date();
      let ejercicio = {
        call: this.exerciseForm.get('call').value,
        code: this.currentCode,
        created: this.datePipe.transform(currentDate, "yyyy-MM-dd"),
        creator: this.exerciseForm.get('creator').value,
        details: this.exerciseForm.get('details').value,
        examples: this.exerciseForm.get('examples').value,
        level: this.exerciseForm.get('level').value,
        rating: this.rating,
        likes: this.likes,
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
        'Ejercicio modificado!',
        'El ejercicio se ha actualizado exitosamente!',
        'success'
      );
      this.db.updateEjercicio(this.ejercicioID, ejercicio);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No has subido el archivo seleccionado. Intenta de nuevo!'
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
        this.sent = true;
        console.log(this.URLPublica);
        Swal.fire(
          'Archivo subido!',
          'El ejercicio se ha guardado exitosamente!',
          'success'
        );
      });
    }, 2000);


  }

}
