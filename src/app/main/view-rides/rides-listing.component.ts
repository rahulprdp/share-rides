import { Component, inject, OnInit, signal } from '@angular/core';
import {
  LocationInfo,
  RideData,
  RideFilters,
  UserData,
} from '../../shared/interfaces/ride.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RideCardComponent } from '../../shared/ride-card/ride-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { VEHICLE_TYPES } from '../../shared/data/data';
import { RidesService } from '../../shared/services/rides.service';
import { AuthService } from '../../shared/services/auth.service';
import { NotifyService } from '../../shared/services/notify.service';

@Component({
  selector: 'app-rides-listing',
  templateUrl: './rides-listing.component.html',
  styleUrls: ['./rides-listing.component.css'],
  imports: [
    MatCardModule,
    MatButtonModule,
    RideCardComponent,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
})
export class RidesListingComponent implements OnInit {
  public VEHICLE_TYPES = VEHICLE_TYPES;
  public today = new Date();

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private _notify = inject(NotifyService);
  private _rides = inject(RidesService);
  private _auth = inject(AuthService);

  public appliedFilters?: RideFilters = this.route.snapshot.queryParams;

  public $data = signal<RideData[]>([]);
  public $locations = signal<LocationInfo[]>([]);
  public $userData = signal<UserData | undefined>(undefined);

  public filterForm = new FormGroup({
    vehicle_type: new FormControl<number | undefined>(undefined, { nonNullable: true }),
    pick_up: new FormControl('', { nonNullable: true }),
    destination: new FormControl('', { nonNullable: true }),
  });

  ngOnInit(): void {
    this._auth.getCurrentUser().subscribe({
      next: (res) => {
        this.$userData.set(res);
        this.getRidesList();
        this.filterChanges();
        this.getRideLocations();
      },
    });

    this.route.queryParams.subscribe({
      next: (res) => {
        this.appliedFilters = res;
        this.getRidesList();
      },
    });
  }

  public getRidesList() {
    this._rides
      .getAllRides({
        ...this.appliedFilters,
      })
      .subscribe({
        next: (res: RideData[]) => {
          this.$data.set(res);
        },
      });
  }

  public joinRide(ride: RideData) {
    if (ride?.emp_id === this.$userData()?.emp_id) {
      this._notify.open('You are the owner of this trip!');
      return;
    }

    if (ride.passengers?.find((val) => val.emp_id === this.$userData()?.emp_id)) {
      this._notify.open('You have already joined the ride!');
      return;
    }

    ride.passengers?.push({
      emp_id: this.$userData()?.emp_id || '',
    });

    this._rides.updateRide(ride).subscribe({
      next: () => {
        this.getRidesList();
        this._notify.open('You have successfully joined the ride!');
      },
    });
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

  public clearFilters() {
    this.filterForm.reset();
    this.updateParams(this.filterForm.getRawValue());
  }

  public filterChanges() {
    this.filterForm.valueChanges.subscribe({
      next: (res) => {
        if (res) this.updateParams(res);
      },
    });
  }

  private updateParams(data?: RideFilters) {
    this.appliedFilters = {
      ...this.appliedFilters,
      ...data,
    };
    this.router.navigate([], {
      relativeTo: this.route.firstChild,
      queryParams: {
        ...this.appliedFilters,
      },
      replaceUrl: true,
      queryParamsHandling: 'replace',
    });
  }
}
