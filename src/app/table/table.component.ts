import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { GenresPipe } from '../../pipes/genres.pipe';
import { IconPipe } from '../../pipes/icon.pipe';
import { LastTimePlayedPipe } from '../../pipes/last-time-played.pipe';
import { SteamScorePipe } from '../../pipes/steam-score.pipe';
import { GamesService } from '../../services/games.service';

@Component({
  imports: [MatTableModule, IconPipe, SteamScorePipe, GenresPipe, LastTimePlayedPipe],
  selector: 'app-table',
  styleUrl: './table.component.css',
  templateUrl: './table.component.html',
})
export class TableComponent {
  private readonly gamesService = inject(GamesService);

  protected readonly gamesResource = this.gamesService.allGames;

  protected readonly displayedColumns: string[] = [
    'jeu',
    'personnalScore',
    'steamScore',
    'metacriticScore',
    'playTime',
    'status',
    'lastTimePlayed',
    'genres',
    'releaseDate',
    'initialPrice',
    'personnalNotes',
  ];
}
