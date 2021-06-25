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

  constructor(private fb: FormBuilder) {
    this.exerciseForm = this.fb.group({
      call: '',
      code: '',
      created: '',
      creator: '',
      details: '',
      examples: this.fb.array([]),
      level: '',
      //likes va en 0
      name: '',
      section: '',
      solution: this.fb.array([]),
      quantities: this.fb.array([]),
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

  //Solution
  solutions(): FormArray {
    return this.exerciseForm.get("solutions") as FormArray
  }

  newSolution(): FormGroup {
    return this.fb.group({
      call: '',
      comment: '',
      result: '',
    })
  }

  addSolution() {
    this.solutions().push(this.newSolution());
  }
  removeSolution(i: number) {
    this.solutions().removeAt(i);
  }

  //Submit
  onSubmit() {
    console.log(this.exerciseForm.value);
  }
}
