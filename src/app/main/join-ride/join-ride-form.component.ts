import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { AppService } from '../../shared/services/app.service';
import { LocationInfo } from '../../shared/interfaces/ride.interface';
import { Router } from '@angular/router';

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
  private router = inject(Router);
  private app = inject(AppService);
  public locations: LocationInfo[] = this.app.getLocations();

  public today = new Date();
  public form = new FormGroup({
    emp_id: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    time: new FormControl('', {
      nonNullable: true,
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

  public submit() {
    if (this.form.valid) {
      this.app.setUser({
         ...this.form.getRawValue()
      });
      this.naviagateToSearch();
    }
  }

  private naviagateToSearch() {
    this.router.navigate(['/view-rides'], {
      queryParams: {
        mode: 'SEARCH',
       
      },
    });
  }
}
