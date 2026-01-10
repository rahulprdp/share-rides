import { Component, inject, OnInit, signal } from "@angular/core";
import { AppService } from "../../shared/services/app.service";
import { RideData } from "../../shared/interfaces/ride.interface";


@Component({
    selector : 'app-rides-listing',
    templateUrl : './rides-listing.component.html',
    styleUrls : ['./rides-listing.component.css']
})
export class RidesListingComponent implements OnInit{
    public app = inject(AppService)
    public mode : 'SEARCH' | 'VIEW'  = 'SEARCH'

    public $data = signal<RideData[]>([])

    ngOnInit(): void {
        const rideData : RideData[] = this.app.getAllRides()
        this.$data.set(rideData)
    }

}