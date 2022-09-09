import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Todo } from '../models/todo';
import { Profesor } from '../models/Profesor';
import { Estudiante } from '../models/Estudiante';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = "http://localhost/curd";

  //PHP_API_SERVER = "http://192.168.100.3/ng-aes/backend";
  //PHP_API_SERVER = "http://localhost/ng-aes/backend";
  //PHP_API_SERVER = "https://ng-apps.000webhostapp.com/backend";

  PHP_API_SERVER = "http://190.15.139.84:8080/ng-aes/backend";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  getProfesores(): Observable<any>{
    const url = `${this.PHP_API_SERVER}/profesores.php`;
    return this.httpClient.get<any>(url);
  }

  getProfesor(codigoprofesor: number): Observable<any> {
    const url = `${this.PHP_API_SERVER}/profesorId.php?codigoprofesor=${codigoprofesor}`;
    return this.httpClient.get<any>(url).pipe(
      tap(_ => console.log(`fetched profesor id=${codigoprofesor}`)),
      catchError(this.handleError<any>(`getProfesor id=${codigoprofesor}`))
    );
  }

  getReport(): Observable<any>{
    const url = `${this.PHP_API_SERVER}/report.php`;
    return this.httpClient.get<any>(url);
  }

  addTodo (todo): Observable<Todo> {
    return this.httpClient.post<Todo>(`${this.PHP_API_SERVER}/create.php`, todo, this.httpOptions).pipe(
      tap((todo: Todo) => console.log(`added todo w/ id=${todo.id}`)),
      catchError(this.handleError<Todo>('addTodo'))
    );
  }

  updateTodo (id, todo): Observable<any> {
    const url = `${this.PHP_API_SERVER}/update.php?id=${id}`;
    return this.httpClient.put(url, todo, this.httpOptions).pipe(
      tap(_ => console.log(`updated todo id=${id}`)),
      catchError(this.handleError<any>('updateTodo'))
    );
  }

  registrarProfesorEstudiante(idProfesor, idEstudiante, todo): Observable<any> {

    console.log('pdateTodo2(id, todo)');

    console.log(idProfesor);
    console.log(idEstudiante);
    console.log(todo);

    todo.idProfesor = idProfesor;
    todo.idEstudiante = idEstudiante;

    const url = `${this.PHP_API_SERVER}/registroProfesorEstudiante.php?id=${idProfesor}`;
    return this.httpClient.post(url, todo, this.httpOptions).pipe(
      tap(_ => console.log(`updated todo id=${idProfesor}`)),
      catchError(this.handleError<any>('updateTodo'))
    );
  }

  buscarEstudianteByCedula(profersorId, form): Observable<any> {

    console.log('buscarEstudianteByCedula('+profersorId+', '+JSON.stringify(form)+')');

    console.log('cedula: '+form.cedulaEstudiante);
    console.log('profersorId: '+profersorId);

    const url = `${this.PHP_API_SERVER}/estudianteBuscarByCedula.php?profesorId=${profersorId}&cedula=${form.cedulaEstudiante}`;

    console.log('url: ' + url);

    return this.httpClient.get<any>(url);
  }

  deleteTodo (id): Observable<Todo> {
    const url = `${this.PHP_API_SERVER}/todoDelete.php?id=${id}`;

    return this.httpClient.delete<Todo>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted todo id=${id}`)),
      catchError(this.handleError<Todo>('deletetodo'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
