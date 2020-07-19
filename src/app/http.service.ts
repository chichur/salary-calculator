import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CalculatorComponent } from './calculator/calculator.component';
import { HistoryComponent } from './history/history.component';


@Injectable({
  providedIn: 'root'
})
// http-сервис для обмена с backend-ом
export class HttpService {
	private url = 'http://127.0.0.1:5000/api/calculator';  // URL для нашего api

	// задаем заголовок http-запроса как содержимое json
	httpOptions = {
    	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    				//Access-Control-Allow-Origin: https://developer.mozilla.org
  	};

  	constructor(private http: HttpClient) { }

  	// GET-запрос получения записей о расчетах
  	getHistory(): Observable<any[]> {
  		return this.http.get<any[]>(this.url)
		.pipe(catchError(this.handleError<any[]>()));
	}

  	/** POST-запрос отправки на сервер результата расчета*/
	addHistory(result: any[]): Observable<CalculatorComponent> {
		return this.http.post<CalculatorComponent>(this.url, result, this.httpOptions)
		.pipe(catchError(this.handleError<CalculatorComponent>()));
		
	}

	/* обработчик ошибок */
  	private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // вывести ошибку в лог
      return of(result as T);
    };
  }
}
