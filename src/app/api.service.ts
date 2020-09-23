import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Todo } from './todo';
import { Profesor } from './profesor';
import { Estudiante } from './estudiante';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = "http://localhost/curd";
  
  PHP_API_SERVER = "http://localhost/ng-app3/backend";
  //PHP_API_SERVER = "https://ng-apps.000webhostapp.com/backend";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  getTodos(): Observable<Profesor[]>{
    const url = `${this.PHP_API_SERVER}/profesores.php`;
    return this.httpClient.get<Profesor[]>(url);
  }
  
  getTodo(profesorId: number): Observable<Profesor> {
    const url = `${this.PHP_API_SERVER}/profesorId.php?profesorId=${profesorId}`;
    return this.httpClient.get<Profesor>(url).pipe(
      tap(_ => console.log(`fetched todo id=${profesorId}`)),
      catchError(this.handleError<Profesor>(`getTodo id=${profesorId}`))
    );
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
