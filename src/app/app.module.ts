import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReportComponent } from './pages/report/report.component';
import { TeachersListComponent } from './pages/teachers-list/teachers-list.component';
import { RegisterStudentComponent } from './pages/register-student/register-student.component';
import { ExcelService } from './services/excel.service';


@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    TeachersListComponent,
    RegisterStudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
