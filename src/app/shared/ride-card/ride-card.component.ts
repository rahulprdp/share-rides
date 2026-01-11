import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RideData } from '../interfaces/ride.interface';
import { TimeFormatPipe } from '../pipes/time-format.pipe';

@Component({
  selector: 'app-ride-card',
  templateUrl: './ride-card.component.html',
  imports: [MatCardModule, MatButtonModule, TimeFormatPipe],
})
export class RideCardComponent {
  public data = input<RideData>();
  public mode = input('VIEW');

  @Output() action = new EventEmitter();

  public changeTimezoneOffset(dateString: string | null, offsetHours: number = -13.5) {
    if (dateString) {
      const date = new Date(dateString);
      const hours = Math.floor(offsetHours);
      const minutes = (offsetHours % 1) * 60;

      date.setHours(date.getHours() + hours);
      date.setMinutes(date.getMinutes() + minutes);

      return date.toISOString();
    }
    return '';
  }
}
