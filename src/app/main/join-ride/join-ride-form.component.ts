import { Component, inject, OnInit, signal } from '@angular/core';
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
import { LocationInfo } from '../../shared/interfaces/ride.interface';
import { Router } from '@angular/router';
import { RidesService } from '../../shared/services/rides.service';
import { AuthService } from '../../shared/services/auth.service';

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
export class JoinRideFormComponent  implements OnInit{
  private router = inject(Router);
  private _rides = inject(RidesService);
  private _auth = inject(AuthService);

    public $locations = signal<LocationInfo[]>([]);
  public today = new Date();
  public form = new FormGroup({
    emp_id: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    time: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    })
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

  public submit() {
    if (this.form.valid) {
      this._auth.setUser(this.form.getRawValue()).subscribe({
        next : ()=>{
          this.naviagateToSearch()
        }
      })
    }
  }

  private naviagateToSearch() {
    this.router.navigate(['/view-rides'], {
      queryParams: {
        mode: 'SEARCH',
        time : this.form.getRawValue()?.time
      },
    });
  }
}
