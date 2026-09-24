import { Pipe, PipeTransform } from '@angular/core';
import { get } from 'my-steam-games-sdk/functional/games';
import { GameDto } from '../types/game.dto';

@Pipe({
  name: 'icon',
})
export class IconPipe implements PipeTransform {
  transform(game: GameDto): string {
    return `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.id}/header.jpg?t=${game.imgIconUrl}`;
  }
}
