import { Pipe, PipeTransform } from '@angular/core';
import { GameDto } from '../types/game.dto';

@Pipe({
  name: 'needsEdit',
})
export class NeedsEditPipe implements PipeTransform {
  transform(game: GameDto): boolean {
    return game.personnalScore == null || game.status == null;
  }
}
