import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CalculatorComponent } from './calculator/calculator.component';


@Injectable({
  providedIn: 'root'
})

// http-сервис для обмена с backend-ом
export class HttpService {
	private heroesUrl = 'api/calculator';  // URL для нашего api

	// задаем заголовок http-запроса как содержимое json
	httpOptions = {
    	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  	};

  	constructor(private http: HttpClient) { }

  	/** POST-запрос отправки на сервер результата расчета*/
	addHistory(result: CalculatorComponent): Observable<CalculatorComponent> {
		return this.http.post<CalculatorComponent>(this.heroesUrl, result, this.httpOptions).pipe();
		console.log('catchError');
	}

  	
}
