import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm} from "@angular/forms";

import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from 'src/app/models/Estudiante';
import { Profesor } from 'src/app/models/Profesor';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent implements OnInit {

  todoForm: FormGroup;

  idProfesor:number= null;
  idEstudiante:number= null;

  message:string= null;

  datosForm:Profesor = null;

  estudiante: Estudiante = null;

  constructor(
    private formBuilder: FormBuilder,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {

    this.findProfesorById(this.activeRouter.snapshot.params['codigoprofesor']);

    this.todoForm = this.formBuilder.group({
      id: ['', Validators.compose([Validators.required])],
      nombre: ['', Validators.compose([Validators.required])],
      cantidad: ['', Validators.compose([Validators.required])],
      cedulaEstudiante: ['', Validators.compose([Validators.required])],
      nombresEstudiante: [''],
      cursoEstudiante: [''],
    });
  }

  findProfesorById(codigoprofesor) {
    console.log('findProfesorById:', codigoprofesor);
    this.api.getProfesor(codigoprofesor).subscribe(dataResponse => {
      console.log('dataResponse:', dataResponse);
      let profesor = dataResponse.profesor;

      this.idProfesor = profesor.codigoprofesor;

      this.todoForm.setValue({
          id: profesor.codigoprofesor,
          nombre: profesor.nombre,
          cantidad: profesor.cantidad,
          cedulaEstudiante: '',
          nombresEstudiante: '',
          cursoEstudiante:'',
        });

      console.log(dataResponse);
      });
  }

  updateTodo(form:NgForm) {
    this.api.updateTodo(this.idProfesor, form)
      .subscribe(res => {
          this.router.navigate(['/']);
        }, (err) => {
          console.log(err);
        }
      );

  }

  registrarProfesorEstudiante(form:NgForm) {

    console.log(form);

    this.message = '';

    if (this.idProfesor == null) {
      this.message = 'Datos del profesor estan vacios';
      return;
    }

    if (this.idEstudiante == null) {
      this.message = 'Datos del estudiante estan vacios';
      return;
    }

    this.api.registrarProfesorEstudiante(this.idProfesor, this.idEstudiante, form)
      .subscribe(res => {
        console.log('response:');
        console.log(res);
          if (res != undefined) {
            if (res.error === 0) {
              this.router.navigate(['/']);
            } else {
              this.message = res.message;
            }
          } else {
            this.message = "ERROR: No se pudo procesar el registro solicitado.";
          }
        }, (err) => {
          console.log(err);
        }
      );
  }

  buscarEstudianteByCedula() {

    this.message = '';

    console.log(this.todoForm.value);
    this.api.buscarEstudianteByCedula(this.idProfesor, this.todoForm.value)
      .subscribe(res => {
        console.log('response: ' + JSON.stringify(res));

        if (res != undefined) {
          if (res.error === 1) {
            this.message = res.mensaje;
          } else {
            if (res.estudiante != undefined) {
              this.estudiante = res.estudiante;
              this.idEstudiante= res.estudiante.codigoestudiante;
              console.log('this.estudiante: ' + JSON.stringify(this.estudiante));
              this.todoForm.patchValue({
                nombresEstudiante: res.estudiante.nombres,
                cursoEstudiante: res.estudiante.curso
              });
            } else {
              this.message = res.mensaje;
              this.estudiante = null;
              this.idEstudiante= null;
              this.todoForm.patchValue({
                nombresEstudiante: '',
                cursoEstudiante: ''
              });
            }
          }
        } else {
          this.message = "Error al buscar la cedula del estudiante";
        }
      }, (err) => {
        console.log(err);
      }
    );
  }

}
