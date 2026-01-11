import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private _snackBar = inject(MatSnackBar);

  public open(message: string) {
    return this._snackBar.open(message, 'close', {
      duration: 2000,
    });
  }
}
