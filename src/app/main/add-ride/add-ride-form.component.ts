import { Component, inject, OnInit, signal } from '@angular/core';
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
import { LocationInfo, TripData, VehicleType } from '../../shared/interfaces/ride.interface';
import { Router } from '@angular/router';
import { RidesService } from '../../shared/services/rides.service';
import { MatDialog } from '@angular/material/dialog';
import { AddLocationFormComponent } from '../../shared/add-location/add-location-form.component';

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
export class AddRideFormComponent implements OnInit {
  private router = inject(Router);
  private _rides = inject(RidesService);

  public today = new Date();
  public VEHICLE_TYPES = VEHICLE_TYPES;
  public $locations = signal<LocationInfo[]>([]);
  public tripData?: TripData;

  readonly dialog = inject(MatDialog);

  public form = new FormGroup({
    emp_id: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    vehicle_type: new FormControl<VehicleType | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    vehicle_no: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    capacity: new FormControl(1, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    time: new FormControl(null, {
      validators: [Validators.required],
    }),
    pick_up: new FormControl<LocationInfo | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    destination: new FormControl<LocationInfo | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    this.getRideLocations();
  }

  public getRideLocations() {
    this._rides.getAllLocations().subscribe({
      next: (res) => {
        if (res) {
          this.$locations.set(res);
        }
      },
    });
  }

  public openAddLocation() {
    this.dialog
      .open(AddLocationFormComponent, {
        height: '400px',
        width: '600px',
      })
      .afterClosed()
      .subscribe({
        next: (res : LocationInfo[] | undefined) => {
          if(res){
            this.$locations.set(res)
          }
        },
      });
  }

  public submit() {
    if (this.form.valid) {
      this.tripData = {
        ...this.form.getRawValue(),
        time: new Date(this.form.getRawValue()?.time || '').toLocaleString(),
      };
      this._rides.addTrip(this.form.getRawValue());
    }
  }

  public formatLabel(value: number): string {
    return `${value}`;
  }

  public navigateToView() {
    this.router.navigate(['/view-rides'], {
      queryParams: {
        mode: 'VIEW',
      },
    });
  }
}
