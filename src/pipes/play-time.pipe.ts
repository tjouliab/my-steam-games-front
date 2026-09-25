import { Pipe, PipeTransform } from '@angular/core';
import { Temporal } from '@js-temporal/polyfill';
import { GameDto } from '../types/game.dto';

@Pipe({
  name: 'playTime',
})
export class PlayTimePipe implements PipeTransform {
  transform(game: GameDto): string {
    const duration = Temporal.Duration.from({ minutes: game.playTime });
    const hours = duration.round({ largestUnit: 'hours' }).hours;
    return `${hours}h`;
  }
}
