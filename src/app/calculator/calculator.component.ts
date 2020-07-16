import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

	salaryForm;

  	constructor(private formBuilder: FormBuilder) {
  		this.salaryForm = this.formBuilder.group({
  			base: '',
  			workDays: '',
  			payDays: '',
  			coff: '',
  			premium: ''
  			});
   	}


  	ngOnInit(): void {
  	}

  	
}
