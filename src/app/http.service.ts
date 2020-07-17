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
	addHistory(result: any[]): Observable<CalculatorComponent> {
		console.log('catchError');
		return this.http.post<CalculatorComponent>(this.heroesUrl, result, this.httpOptions)
		.pipe(catchError(this.handleError<CalculatorComponent>('deleteHero')));
		
	}

  	private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };

  }
}
