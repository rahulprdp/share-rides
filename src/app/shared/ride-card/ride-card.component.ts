import { Component, EventEmitter, input, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { RideData } from "../interfaces/ride.interface";

@Component({
    selector : 'app-ride-card',
    templateUrl: './ride-card.component.html',
    imports :[MatCardModule, MatButtonModule]
})
export class RideCardComponent{
    public data  = input<RideData>()
    public mode = input('VIEW')

    @Output() action = new EventEmitter()
}