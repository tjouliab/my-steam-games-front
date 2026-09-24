import { Pipe, PipeTransform } from '@angular/core';
import { GameDto } from '../types/game.dto';

@Pipe({
  name: 'genres',
})
export class GenresPipe implements PipeTransform {
  transform(game: GameDto): string {
    return game.genres.map((genre) => genre.description).join(', ');
  }
}
