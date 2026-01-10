import { inject, Injectable } from "@angular/core";
import { LocationInfo, RideData, TripData, UserData } from "../interfaces/ride.interface";
import { LocalService } from "./local.service";
import { of } from "rxjs";

@Injectable({
    providedIn : 'root'
})
export class AppService {
    public local = inject(LocalService);

    public setUser(data : UserData){
        this.local.set('X_USER',data)
    }

    public getUser(){
        return this.local.get('X_USER')
    }

    public addTrip(data : TripData){
        if(this.getUser()?.emp_id != data.emp_id){
            this.setUser({
            emp_id : data.emp_id
            })
        }

        const userData : UserData = {
            emp_id : data.emp_id
        }

        const rideData : RideData = {
            ...data,
            passengers : [],
            id : crypto.randomUUID()
        }   

        const userTrips = this.getUser()?.trips ? this.getUser()?.trips : []
        userTrips.push(rideData);
        userData['trips'] = userTrips;
        this.setUser(userData);

        const allTrips = this.local.get('X_RIDES') ? this.local.get('X_RIDES') : []
        this.local.set('X_RIDES', [...allTrips, rideData]);
    }

    public setRides(data : RideData[]){
        this.local.set('X_RIDES', data);
    }

    public getRides(){
        return this.local.get('X_RIDES')||[]
    }

    public updateRide(ride : RideData){
       let rides = this.getRides().filter((val : any)=> val?.id != ride?.id)
       rides = [ride,...rides]
       this.setRides(rides)

       return of(true)
    }
    
    public getAllRides(){
         return of(this.local.get('X_RIDES'))
    }

    public setLocations(data : LocationInfo[]){
        this.local.set('X_LOCATIONS',data)
    }

    public getLocations(){
        return this.local.get('X_LOCATIONS')
    }
}