import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { AppService } from '../../shared/services/app.service';
import { LocationInfo } from '../../shared/interfaces/ride.interface';

@Component({
  selector: 'app-join-ride-form',
  templateUrl: './join-ride-form.component.html',
  styleUrls: ['./join-ride-form.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
})
export class JoinRideFormComponent {
  public app = inject(AppService);
  public locations : LocationInfo[] = this.app.getLocations();

  public today = new Date();
  public form = new FormGroup({
    emp_id: new FormControl(''),
    time: new FormControl(''),
    pick_up: new FormControl(''),
    destination: new FormControl(''),
  });

  public submit(){
    if(this.form.valid){
      //
    }
  }
}
