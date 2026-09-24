import { Pipe, PipeTransform } from '@angular/core';
import { GameDto } from '../types/game.dto';

@Pipe({
  name: 'steamScore',
})
export class SteamScorePipe implements PipeTransform {
  transform(game: GameDto): number {
    const totalReviews = game.positiveReviews + game.negativeReviews;
    return Math.floor((game.positiveReviews / totalReviews) * 100);
  }
}
