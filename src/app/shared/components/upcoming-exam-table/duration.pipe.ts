import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value: string | Date): string {
    const start = new Date(value);
    const now = new Date();
    const diff = now.getTime() - start.getTime();

    const days = Math.floor(diff / (24 * 3600000));
    const hours = Math.floor((diff % (24 * 3600000)) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);

    let result = '';
    if (days > 0) {
      result += `${days}d `;
    }
    if (hours > 0 || days > 0) {
      result += `${hours}hr `;
    }
    if (minutes > 0 || (hours === 0 && days === 0)) {
      result += `${minutes}min`;
    }

    return result.trim();
  }
}
