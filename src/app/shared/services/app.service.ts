import { inject, Injectable } from '@angular/core';
import { LocationInfo, RideData, TripData, UserData } from '../interfaces/ride.interface';
import { LocalService } from './local.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public local = inject(LocalService);

  public setUser(data: UserData) {
    this.local.set('X_USER', data);
  }

  public getUser() {
    return this.local.get('X_USER');
  }

  public setRides(data: RideData[]) {
    this.local.set('X_RIDES', data);
  }

  public getRides() {
    return this.local.get('X_RIDES') || [];
  }

  public setLocations(data: LocationInfo[]) {
    this.local.set('X_LOCATIONS', data);
  }

  public getLocations() {
    return this.local.get('X_LOCATIONS');
  }
}
