import { resource, Service } from '@angular/core';
import { functional } from 'my-steam-games-sdk';
import { environment } from '../../../../../environment';

@Service()
export class GameStatusService {
  readonly allGameStatus = resource({
    defaultValue: {},

    loader: ({ abortSignal }) =>
      functional.game_status.get({
        host: environment.backendURL,
        options: {
          signal: abortSignal,
        },
      }),
  });
}
