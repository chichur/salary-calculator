import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculatorComponent } from './calculator/calculator.component';
import { HistoryComponent } from './history/history.component'

// маршруты для компонентов
const routes: Routes = [
  { path: '', redirectTo: '/calculator', pathMatch: 'full'},
  { path: 'calculator', component: CalculatorComponent },
  { path: 'history', component: HistoryComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
