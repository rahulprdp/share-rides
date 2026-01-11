import { input, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true,
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (value) {
      let date = new Date(value);

      const hour = date.getHours() % 12 || 12;
      const minute = date.getMinutes().toString().padStart(2, '0');
      return `${hour}:${minute} ${hour >= 12 ? 'PM' : 'AM'}`;
    }
    return '';
  }
}
