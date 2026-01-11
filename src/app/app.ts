import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AppService } from './shared/services/app.service';
import { LOCATIONS } from './shared/data/data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('quick-rides');
  private router = inject(Router)
  private app = inject(AppService)

  constructor(){
    const data = this.app.getLocations()
    if(!data){
       this.app.setLocations(LOCATIONS)
    }
  }

  public navigateToHome(){
    this.router.navigate([''])
  }
}
