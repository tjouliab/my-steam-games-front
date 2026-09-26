import { Pipe, PipeTransform } from '@angular/core';
import { GameDto } from '../types/game.dto';
import { GameUtils } from '../utils/game.utils';

@Pipe({
  name: 'needsEdit',
})
export class NeedsEditPipe implements PipeTransform {
  transform(game: GameDto): boolean {
    return GameUtils.needsEdit(game);
  }
}
