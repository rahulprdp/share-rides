import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TripData, UserData, RideData, LocationInfo } from '../interfaces/ride.interface';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class RidesService {
  private app = inject(AppService);

  public getAllLocations(): Observable<LocationInfo[] | undefined> {
    const data = this.app.getLocations();

    return of(data);
  }

  public addTrip(data: TripData) {
    if (this.app.getUser()?.emp_id != data.emp_id) {
      this.app.setUser({
        emp_id: data.emp_id,
      });
    }

    const userData: UserData = {
      emp_id: data.emp_id,
    };

    const rideData: RideData = {
      ...data,
      passengers: [],
      id: crypto.randomUUID(),
    };

    const userTrips = this.app.getUser()?.trips ? this.app.getUser()?.trips : [];
    userTrips.push(rideData);
    userData['trips'] = userTrips;
    this.app.setUser(userData);

    const allTrips = this.app.getRides() ? this.app.getRides() : [];
    this.app.setRides([...allTrips, rideData]);

    return of(userData);
  }

  public updateRide(ride: RideData) {
    let rides = this.app.getRides().filter((val: any) => val?.id != ride?.id);
    rides = [ride, ...rides];
    this.app.setRides(rides);

    return of(true);
  }


  public getAllRides(filters: { vehicle_type?: number; time?: string; emp_id?: string }) {
    const data = this.app.getRides()?.filter((val: any) => {
      const typeMatch = filters?.vehicle_type
        ? val.vehicle_type?.value == filters.vehicle_type
        : true;
      const timeMatch = filters?.time ? this.isWithinRange(val.time, filters.time) : true;
      const empMatch = filters?.emp_id ? val.emp_id == filters.emp_id : true;
      return typeMatch && timeMatch && empMatch;
    });

    return of(data);
  }

  private isWithinRange(timeStr1: string, timeStr2: string) {
    const date1: Date = new Date(timeStr1);
    const date2: Date = new Date(timeStr2);

    const diffMs = Math.abs(date1.getTime() - date2.getTime());
    const diffMinutes = diffMs / (1000 * 60);
    const isWithinRange = diffMinutes <= 60;
    return isWithinRange;
  }

  public addLocation(data: LocationInfo) {
    const locations = this.app.getLocations() || [];
    locations.push(data);

    this.app.setLocations(locations);

    return of(locations);
  }
}
