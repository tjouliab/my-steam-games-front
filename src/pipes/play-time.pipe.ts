import { Pipe, PipeTransform } from '@angular/core';
import { Temporal } from '@js-temporal/polyfill';

@Pipe({
  name: 'playTime',
})
export class PlayTimePipe implements PipeTransform {
  transform(playTime: number): string {
    const duration = Temporal.Duration.from({ minutes: playTime });
    const hours = duration.round({ largestUnit: 'hours' }).hours;
    return `${hours}h`;
  }
}
