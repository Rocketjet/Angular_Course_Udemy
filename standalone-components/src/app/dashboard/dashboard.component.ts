import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule], //цей модуль нам тут потрібен, щоб викор. його функціонал, наприклад routerLink
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
