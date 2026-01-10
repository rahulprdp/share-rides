import { Component } from '@angular/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-ride-form',
  templateUrl: './add-ride-form.component.html',
  styleUrls: ['./add-ride-form.component.css'],
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class AddRideFormComponent {
  public today = new Date();
  public form = new FormGroup({
    emp_id: new FormControl(''),
    vehicle_type: new FormControl(''),
    vehicle_no: new FormControl(''),
    capacity: new FormControl(''),
    time: new FormControl(''),
    pick_up: new FormControl(''),
    destination: new FormControl(''),
  });

  public submit() {
    if (this.form.valid) {
      console.log(this.form.getRawValue());
    }
  }
}
