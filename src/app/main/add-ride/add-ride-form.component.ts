import { Component, inject, model } from '@angular/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { VEHICLE_TYPES } from '../../shared/data/data';
import { AppService } from '../../shared/services/app.service';
import { LocationInfo, TripData, VehicleType } from '../../shared/interfaces/ride.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ride-form',
  templateUrl: './add-ride-form.component.html',
  styleUrls: ['./add-ride-form.component.css'],
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatSliderModule,
  ],
})
export class AddRideFormComponent {
  public app = inject(AppService);
  public router = inject(Router)

  public today = new Date();
  public VEHICLE_TYPES = VEHICLE_TYPES;
  public locations : LocationInfo[] = this.app.getLocations();
  public tripData ?: TripData;

  public form = new FormGroup({
    emp_id: new FormControl('', {
      nonNullable : true,
      validators : [Validators.required]
    }),
    vehicle_type: new FormControl<VehicleType>( {
      label : '',
      value : ''
    } , {
      nonNullable : true,
      validators : [Validators.required],
    }),
    vehicle_no: new FormControl('', {
      nonNullable : true,
      validators : [Validators.required]
    }),
    capacity: new FormControl(1, {
      nonNullable : true,
      validators : [Validators.required]
    }),
    time: new FormControl('', {
      nonNullable : true,
      validators : [Validators.required]
    }),
    pick_up: new FormControl<LocationInfo | undefined>(undefined, {
      nonNullable : true,
      validators : [Validators.required]
    }),
    destination: new FormControl<LocationInfo | undefined>(undefined, {
      nonNullable : true,
      validators : [Validators.required]
    }
    ),
  });

  public submit() {
    if (this.form.valid) {
      this.tripData = {
        ...this.form.getRawValue() 
      }
      this.app.addTrip(this.form.getRawValue());
    }
  }

  public formatLabel(value: number): string {
    return `${value}`;
  }

  public navigateToView(){
    this.router.navigate(['/view-rides'],{
      queryParams : {
        mode : 'VIEW'
      }
    })
  }
}
