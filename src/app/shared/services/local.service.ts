import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  public set(key: string, value: any) {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  public get(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
  }
}
