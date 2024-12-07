import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [RouterModule], // Import RouterModule for routerLink
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
})
export class TopMenuComponent {
  logout() {
    localStorage.removeItem('token'); // Remove JWT token
    window.location.href = '/'; // Redirect to login page
  }
}
