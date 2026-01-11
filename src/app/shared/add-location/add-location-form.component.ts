import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RidesService } from '../services/rides.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-location-form',
  templateUrl: './add-location-form.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class AddLocationFormComponent {
  private _rides = inject(RidesService);
  private _dialogRef = inject(MatDialogRef);

  public form = new FormGroup({
    label: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    type: new FormControl<'PICK' | 'DROP'>('PICK', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public submit() {
    if (this.form.valid) {
      this._rides
        .addLocation({
          ...this.form.getRawValue(),
          id: crypto.randomUUID(),
        })
        .subscribe({
          next: (res) => {
            this._dialogRef.close(res);
          },
        });
    }
  }
}
