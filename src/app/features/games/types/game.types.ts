import { editOne } from 'my-steam-games-sdk/functional/games/edit_one/index';
import { get } from 'my-steam-games-sdk/functional/games/index';

export type GameDto = get.Output[number];

export type GameEditBody = editOne.Body;

export type GameStatusLabel = NonNullable<GameDto['status']>['label'];
