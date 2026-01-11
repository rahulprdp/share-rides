import { inject, Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Observable, of } from 'rxjs';
import { UserData } from '../interfaces/ride.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private app = inject(AppService);

  public getCurrentUser(): Observable<UserData | undefined> {
    const data = this.app.getUser();
    return of(data);
  }

  public setUser(data: UserData): Observable<UserData | undefined> {
    this.app.setUser(data);
    return of(data);
  }
}
