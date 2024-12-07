import { Component } from '@angular/core';
import { TopMenuComponent } from '../top-menu/top-menu.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopMenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {}
