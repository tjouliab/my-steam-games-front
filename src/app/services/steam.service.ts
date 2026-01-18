import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, zip } from 'rxjs';
import { environment } from '../../../environment';
import { SteamGameDto } from '../dto/steam-game.dto';

@Injectable({
  providedIn: 'root',
})
export class SteamService {
  private readonly http = inject(HttpClient);

  getAllFamilyGames(): Observable<SteamGameDto[]> {
    const playersGames$: Observable<SteamGameDto[]>[] = [];
    for (const steamId of Object.values(environment.familyPlayers)) {
      playersGames$.push(
        this.http.get<SteamGameDto[]>(`http://localhost:3000/steam/all-player-games/${steamId}`),
      );
    }

    // Remove duplicates
    return zip(playersGames$).pipe(
      map((gamesList) => {
        const allGames = gamesList.flat();
        const gamesMap = new Map<number, SteamGameDto>(allGames.map((game) => [game.appid, game]));
        return [...gamesMap.values()];
      }),
    );
  }
}
