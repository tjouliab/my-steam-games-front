import { Service } from '@angular/core';
import { functional } from 'my-steam-games-sdk';
import { defer, from } from 'rxjs';
import { environment } from '../../../environment';

@Service()
export class GamesService {
  get() {
    return defer(() => from(functional.games.get({ host: environment.backendURL })));
  }
}
