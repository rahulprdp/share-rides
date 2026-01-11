import { input, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true,
})
export class TimeFormatPipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    offsetHours: number = 6,
    offsetMinutes: number = -30
  ): string {
    if (value) {
      let date = new Date(value);
      date.setHours(date.getHours() + offsetHours);
      date.setMinutes(date.getMinutes() + offsetMinutes);

      const hour = date.getUTCHours() % 12 || 12;
      const minute = date.getUTCMinutes().toString().padStart(2, '0');
      return `${hour}:${minute} ${ hour >=12 ? 'PM' : 'AM' }`;
    }
    return '';
  }
}
