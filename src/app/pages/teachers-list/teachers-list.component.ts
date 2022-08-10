import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Profesor } from 'src/app/models/Profesor';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent implements OnInit {

  data: Profesor[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getProfesores().subscribe(res => {
        if (res && res.error == '0') {
          this.data = res.profesores;
        } else {
          console.log(res.message);
        }
      }, err => {
        console.log(err);
      });
  }

  deleteTodo(id, index) {
    this.api.deleteTodo(id).subscribe(res => {
        this.data.splice(index,1);
      }, (err) => {
        console.log(err);
      }
    );
  }

}
