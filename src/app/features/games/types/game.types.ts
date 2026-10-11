import { editOne } from '@tjouliab/my-steam-games-sdk/lib/functional/games/edit_one/index';
import { get } from '@tjouliab/my-steam-games-sdk/lib/functional/games/index';

export type GameDto = get.Output[number];

export type GameEditBody = editOne.Body;

export type GameStatusLabel = NonNullable<GameDto['status']>['label'];
