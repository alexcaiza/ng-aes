import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './pages/report/report.component';
import { TeachersListComponent } from './pages/teachers-list/teachers-list.component';
import { RegisterStudentComponent } from './pages/register-student/register-student.component';


const routes: Routes = [

  {
    path: '',
    component: TeachersListComponent,
    data: { title: 'List of todos' }
  },
  {
    path: 'teachers-list',
    component: TeachersListComponent,
    data: { title: 'Profesores' }
  },
  {
    path: 'register-student/:codigoprofesor',
    component: RegisterStudentComponent,
    data: { title: 'Registro' }
  },
  {
    path: 'report',
    component: ReportComponent,
    data: { title: 'Report' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
