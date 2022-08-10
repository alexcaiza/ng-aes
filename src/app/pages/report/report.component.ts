import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/models/report';
import { ApiService } from 'src/app/services/api.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  data: Report[] = [];

  dataOfFootballers: any = [{
    playerName: 'Cristiano Ronaldo',
    playerCountry: 'Pourtgal',
    playerClub: 'Juventus'
  },
  {
    playerName: 'Lionel Messi',
    playerCountry: 'Argentina',
    playerClub: 'Barcelona'
  },
  {
    playerName: 'Neymar Junior',
    playerCountry: 'Brazil',
    playerClub: 'PSG'
  },
  {
  playerName: 'Tonni Kroos',
  playerCountry: 'Germany',
  playerClub: 'Real Madrid'
  },
  {
    playerName: 'Paul Pogba',
    playerCountry: 'France',
    playerClub: 'Manchester United'
  }];
  constructor(private excelService:ExcelService,
    private api: ApiService
    ){

  }
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.data, 'report_data');
  }

  ngOnInit() {
    this.findReport();
  }

  public findReport() {
    this.api.getReport().subscribe(res => {
      console.log('res:', res);
      if (res && res.error == '0') {
        this.data = res.profesores;
      } else {
        console.log(res.message);
      }
    }, err => {
      console.log(err);
    });
  }

}
