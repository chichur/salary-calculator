import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  providers: [HttpService]
})
export class CalculatorComponent implements OnInit {

	salaryForm; // Форма расчета
	result; // результат вычисления

  	constructor(private formBuilder: FormBuilder, private httpService: HttpService) {
  		// регулярное выражение для чисел с плавающей точкой
  		var regexp_float = '^[\-]{0,1}[0-9]{1,}(([\.\,]{0,1}[0-9]{1,})|([0-9]{0,}))$';
  		// регулярное выражение для целых чисел
  		var regexp_int = '^[1-9]*$';
  		// инициализируем форму с валидаторами 
  		this.salaryForm = this.formBuilder.group({
  			base: ['', [Validators.required,  Validators.pattern(regexp_float)]],
  			workDays: ['', [Validators.required,  Validators.pattern(regexp_int)]],
  			payDays: ['', [Validators.required,  Validators.pattern(regexp_int)]],
  			coff: ['1', [Validators.required,  Validators.pattern(regexp_float)]],
  			premium: ['0', [Validators.required,  Validators.pattern(regexp_float)]]
  			}, );
   	}


  	ngOnInit(): void {
  		
  	}

  	// обработка события отправки формы
  	onSubmit(data): void {
  		// формула вычисления зарплаты
  		var result = (((data.base * data.coff) + Number(data.premium)) / data.payDays) * data.workDays;
  		// присваиваем результат
  		this.result = result.toFixed(2) + " руб.";
  		this.httpService.addHistory(this);
  	}
    
  	get base() { return this.salaryForm.get('base');  }
  	get workdays() { return this.salaryForm.get('workDays'); }
  	get paydays() { return this.salaryForm.get('payDays'); }
  	get coff() { return this.salaryForm.get('coff'); }
  	get premium() { return this.salaryForm.get('premium'); }
}
