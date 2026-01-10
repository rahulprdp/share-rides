import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [MatButtonModule],
})
export class DashboardComponent {
  private router = inject(Router);

  public navigateToAddRide() {
    this.router.navigate(['/add-ride']);
  }

  public navigateToJoinRide() {
    this.router.navigate(['/join-ride']);
  }
}
