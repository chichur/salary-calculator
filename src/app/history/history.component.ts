import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{

	records: any[]; // массив записей

  constructor(private httpService: HttpService) {
  	// отправляем GET-запрос к серверу, получить данные расчетов
  	this.httpService.getHistory().subscribe(records => this.records = records);
   }

  ngOnInit(): void {
  }

}
