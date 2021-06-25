import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-ejercicio',
  templateUrl: './nuevo-ejercicio.component.html',
  styleUrls: ['./nuevo-ejercicio.component.css']
})
export class NuevoEjercicioComponent {

  name = 'Angular';
  exerciseForm: FormGroup = null;
  levels: any = ['Nivel 1', 'Nivel 2', 'Nivel 3', 'Nivel 4', 'Nivel 5'];
  categories: any = ['Listas, vectores y matrices', 'Condicionales', ' Algoritmos numéricos', 'Árboles'];

  constructor(private fb: FormBuilder) {

    this.exerciseForm = this.fb.group({
      call: '',
      //hay que hacer un codigo incremental
      created: '',
      creator: '',
      details: '',
      examples: this.fb.array([]),
      level: [''],
      //likes va en 0
      name: '',
      section: [''],
      codeSolution: '',
      inputs: this.fb.array([]),
      outputs: this.fb.array([]),
    });
  }

  //Quantities
  quantities(): FormArray {
    return this.exerciseForm.get("quantities") as FormArray
  }
  newQuantity(): FormGroup {
    return this.fb.group({
      qty: '',
      price: '',
    })
  }
  addQuantity() {
    this.quantities().push(this.newQuantity());
  }
  removeQuantity(i: number) {
    this.quantities().removeAt(i);
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
    console.log(this.exerciseForm.value);
    //Obtener los valores por separado
    console.log(this.exerciseForm.get('call').value);
  }
}
