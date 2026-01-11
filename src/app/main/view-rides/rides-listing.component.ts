import { Component, inject, OnInit, signal } from '@angular/core';
import { RideData, UserData, VehicleType } from '../../shared/interfaces/ride.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RideCardComponent } from '../../shared/ride-card/ride-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private _notify = inject(NotifyService);
  private _rides = inject(RidesService);
  private _auth = inject(AuthService);

  public mode: 'SEARCH' | 'VIEW' = this.route.snapshot.queryParams['mode'] || 'VIEW';

  public $data = signal<RideData[]>([]);
  public $userData = signal<UserData | undefined>(undefined);
  public filter = new FormControl<VehicleType | undefined>(undefined);

  ngOnInit(): void {
    this._auth.getCurrentUser().subscribe({
      next: (res) => {
        this.$userData.set(res);
        this.getRidesList();
        this.filterChanges();
      },
    });

    const data = this.route.snapshot.queryParams['mode']
      ? this.getVehicleType(this.route.snapshot.queryParams['vehicle_type'])
      : undefined;
    this.filter.setValue(data);

    this.route.queryParams.subscribe({
      next: (res) => {
        this.getRidesList(parseInt(res['vehicle_type'] || ''));
      },
    });
  }

  public getRidesList(vehichle_type?: number) {
    this._rides.getAllRides(vehichle_type).subscribe({
      next: (res: RideData[]) => {
        this.$data.set(
          res.filter((val) => {
            if (this.mode === 'SEARCH' && val?.time) {
              return this.isWithinRange(val.time);
            } else {
              return val?.emp_id === this.$userData()?.emp_id;
            }
          })
        );
      },
    });
  }

  private checkIfJoined(ride: RideData) {
    const user = ride.passengers?.find((val) => val.emp_id === this.$userData()?.emp_id);
    return user ? true : false;
  }

  public joinRide(ride: RideData) {
    if (this.checkIfJoined(ride)) {
      this._notify.open('You have already joined the ride!')
      return;
    }

    ride.passengers?.push({
      emp_id: this.$userData()?.emp_id || '',
    });

    this._rides.updateRide(ride).subscribe({
      next: () => {
        this.getRidesList();
      },
    });
  }

  public isWithinRange(timeStr1: string) {
    const date1: Date = new Date(timeStr1);
    const date2: Date = new Date(this.$userData()?.time || '');

    const diffMs = Math.abs(date1.getTime() - date2.getTime());
    const diffMinutes = diffMs / (1000 * 60);
    const isWithinRange = diffMinutes <= 60;
    return isWithinRange;
  }

  public clearFilters() {
    this.filter.setValue(undefined);
    this.updateParams();
  }

  public filterChanges() {
    this.filter.valueChanges.subscribe({
      next: (res) => {
        if (res) this.updateParams(res);
      },
    });
  }

  private updateParams(data?: VehicleType) {
    this.router.navigate([], {
      relativeTo: this.route.firstChild,
      queryParams: {
        mode: this.mode,
        vehicle_type: data?.value,
      },
      replaceUrl: true,
      queryParamsHandling: 'replace',
    });
  }

  private getVehicleType(type: number): VehicleType | undefined {
    const data = VEHICLE_TYPES.find((val) => val.value == type);
    return data;
  }
}
