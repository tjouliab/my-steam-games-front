import { resource, Service } from '@angular/core';
import { functional } from 'my-steam-games-sdk';
import { environment } from '../../environment';

@Service()
export class GamesService {
  readonly allGames = resource({
    defaultValue: [],

    loader: ({ abortSignal }) =>
      functional.games.get({
        host: environment.backendURL,
        options: {
          signal: abortSignal,
        },
      }),
  });
}
