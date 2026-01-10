import { Component } from "@angular/core";


@Component({
    selector : 'app-rides-listing',
    templateUrl : './rides-listing.component.html',
    styleUrls : ['./rides-listing.component.css']
})
export class RidesListingComponent{
    public mode : 'SEARCH' | 'VIEW'  = 'SEARCH'
}