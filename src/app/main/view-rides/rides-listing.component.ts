import { Component, inject, OnInit, signal } from '@angular/core';
import { AppService } from '../../shared/services/app.service';
import { RideData, UserData } from '../../shared/interfaces/ride.interface';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RideCardComponent } from '../../shared/ride-card/ride-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rides-listing',
  templateUrl: './rides-listing.component.html',
  styleUrls: ['./rides-listing.component.css'],
  imports: [MatCardModule, MatButtonModule, RideCardComponent],
})
export class RidesListingComponent implements OnInit {
     private _snackBar = inject(MatSnackBar);
  public route = inject(ActivatedRoute);
  public app = inject(AppService);
  public mode: 'SEARCH' | 'VIEW' = this.route.snapshot.queryParams['mode'] || 'VIEW';
  public appliedFilters: any = this.route.snapshot.queryParams;

  public $data = signal<RideData[]>([]);
  public $userData = signal<UserData | undefined>(undefined);

  ngOnInit(): void {
    this.$userData.set(this.app.getUser());
    this.getRidesList()
  }

  public getRidesList() {
    this.app.getAllRides().subscribe({
      next: (res: RideData[]) => {
        this.$data.set(
          res.filter((val) => {
            if (this.mode === 'SEARCH') {
              return this.isWithinRange(val?.time);
            } else {
              return val?.emp_id === this.$userData()?.emp_id;
            }
          })
        );
      },
    });
  }

  private checkIfJoined(ride : RideData){
    const user = ride.passengers?.find((val)=> val.emp_id === this.$userData()?.emp_id)
    return user ? true : false
  }

  public joinRide(ride : RideData){
    if(this.checkIfJoined(ride)){
       this._snackBar.open('You are already in the ride!','close',{
        duration : 2000
       });
      return;
    }

    ride.passengers?.push({
      emp_id : this.$userData()?.emp_id || ''
    })

    this.app.updateRide(ride).subscribe({
      next : ()=>{
        this.getRidesList()
      }
    })
  }

  public isWithinRange(timeStr1: string) {
    const date1: Date = new Date(timeStr1);
    const date2: Date = new Date(this.appliedFilters?.time || '');

    const diffMs = Math.abs(date1.getTime() - date2.getTime());
    const diffMinutes = diffMs / (1000 * 60);
    const isWithinRange = diffMinutes <= 60;
    return isWithinRange;
  }
}
