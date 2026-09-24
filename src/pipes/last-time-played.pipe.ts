import { Pipe, PipeTransform } from '@angular/core';
import { Temporal } from '@js-temporal/polyfill';
import { GameDto } from '../types/game.dto';

@Pipe({
  name: 'lastTimePlayed',
})
export class LastTimePlayedPipe implements PipeTransform {
  transform(game: GameDto): string {
    if (!game?.lastTimePlayed) {
      return 'Jamais';
    }

    return Temporal.Instant.fromEpochMilliseconds(game.lastTimePlayed * 1000)
      .toZonedDateTimeISO('UTC')
      .toPlainDate()
      .toString();
  }
}
