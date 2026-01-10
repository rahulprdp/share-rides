import { inject, Injectable } from "@angular/core";
import { LocationInfo, RideData, TripData, UserData } from "../interfaces/ride.interface";
import { LocalService } from "./local.service";

@Injectable({
    providedIn : 'root'
})
export class AppService {
    public local = inject(LocalService);

    public setUser(data : UserData){
        const userData = {
            emp_id : data?.emp_id,
            rides : [],
            trips : []
        }
        this.local.set('X_USER',data)
    }

    public getUser(){
        return this.local.get('X_USER')
    }

    public addToUserTrip(data : TripData){
        const userData = {
            ...this.getUser(),
        }

        if( userData['trips']){
            userData['trips'].push(data)
        }
        
        this.setUser(userData)

        const rideData : RideData = {
            ...data,
            passengers : [],
            id : crypto.randomUUID()
        }   

        const allTrips = this.local.get('X_RIDES') ? this.local.get('X_RIDES') : []
        this.local.set('X_RIDES', [...allTrips, rideData]);
    }

    
    public getAllRides(){
         return this.local.get('X_RIDES')
    }

    public setLocations(data : LocationInfo[]){
        this.local.set('X_LOCATIONS',data)
    }

    public getLocations(){
        return this.local.get('X_LOCATIONS')
    }
}