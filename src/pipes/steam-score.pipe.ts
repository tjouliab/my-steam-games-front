import { Pipe, PipeTransform } from '@angular/core';
import { GameDto } from '../types/game.dto';
import { GameUtils } from '../utils/game.utils';

@Pipe({
  name: 'steamScore',
})
export class SteamScorePipe implements PipeTransform {
  transform(game: GameDto): number {
    return GameUtils.getSteamScore(game);
  }
}
