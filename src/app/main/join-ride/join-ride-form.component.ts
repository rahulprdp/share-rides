import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';

@Component({
  selector: 'app-join-ride-form',
  templateUrl: './join-ride-form.component.html',
  styleUrls: ['./join-ride-form.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
})
export class JoinRideFormComponent {
  public today = new Date();
  public form = new FormGroup({
    emp_id: new FormControl(''),
    time: new FormControl(''),
    pick_up: new FormControl(''),
    destination: new FormControl(''),
  });

  public submit(){
    if(this.form.valid){
      //
    }
  }
}
