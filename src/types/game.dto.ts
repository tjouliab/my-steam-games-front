import { get } from 'my-steam-games-sdk/functional/games';

export type GameDto = get.Output[number];

export type GameStatusLabel = NonNullable<GameDto['status']>['label'];
