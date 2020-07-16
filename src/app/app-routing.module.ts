import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculatorComponent } from './calculator/calculator.component';
import { HistoryComponent } from './history/history.component'

const routes: Routes = [
  { path: '', redirectTo: '/calculator', pathMatch: 'full'},
  { path: 'calculator', component: CalculatorComponent },
  { path: 'history', component: History }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
