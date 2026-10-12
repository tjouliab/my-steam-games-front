import { resource, Service } from '@angular/core';
import { functional } from '@tjouliab/my-steam-games-sdk';
import { defer, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GameEditBody } from '../types/game.types';

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

  editOne(body: GameEditBody): Observable<void> {
    return defer(() =>
      functional.games.edit_one.editOne({ host: environment.backendURL }, body),
    );
  }
}
