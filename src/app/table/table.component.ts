import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, viewChild } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GenresPipe } from '../../pipes/genres.pipe';
import { LastTimePlayedPipe } from '../../pipes/last-time-played.pipe';
import { PlayTimePipe } from '../../pipes/play-time.pipe';
import { SteamScorePipe } from '../../pipes/steam-score.pipe';
import { GamesService } from '../../services/games.service';
import { GameDto } from '../../types/game.dto';
import { NeedsEditPipe } from '../../pipes/needs-edit.pipe';

const COLUMNS = {
  JEU: { FIELD: 'jeu', NAME: 'Jeu' },
  PERSONNAL_SCORE: { FIELD: 'personnalScore', NAME: 'Score Perso' },
  STEAM_SCORE: { FIELD: 'steamScore', NAME: 'Score Steam' },
  METACRITIC_SCORE: { FIELD: 'metacriticScore', NAME: 'Score Metacritic' },
  PLAY_TIME: { FIELD: 'playTime', NAME: 'Temps de jeu' },
  STATUS: { FIELD: 'status', NAME: 'Statut' },
  LAST_TIME_PLAYED: { FIELD: 'lastTimePlayed', NAME: 'Dernier lancement' },
  GENRES: { FIELD: 'genres', NAME: 'Genres' },
  RELEASE_DATE: { FIELD: 'releaseDate', NAME: 'Date de sortie' },
  INITIAL_PRICE: { FIELD: 'initialPrice', NAME: 'Prix' },
  PERSONNAL_NOTES: { FIELD: 'personnalNotes', NAME: 'Notes perso' },
  EDIT: { FIELD: 'edit', NAME: 'Edit' },
} as const;

@Component({
  imports: [
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatIconButton,
    NgOptimizedImage,
    SteamScorePipe,
    GenresPipe,
    LastTimePlayedPipe,
    CurrencyPipe,
    PlayTimePipe,
    NeedsEditPipe,
  ],
  selector: 'app-table',
  styleUrl: './table.component.css',
  templateUrl: './table.component.html',
})
export class TableComponent {
  private readonly gamesService = inject(GamesService);

  private readonly sort = viewChild(MatSort);

  protected readonly gamesResource = this.gamesService.allGames;
  protected readonly dataSource = computed(() => {
    if (this.gamesResource.status() !== 'resolved') return undefined;

    const dataSource = new MatTableDataSource<GameDto>(this.gamesResource.value());
    dataSource.sort = this.sort() ?? null;
    dataSource.sortingDataAccessor = (game, column) => {
      if (column === COLUMNS.JEU.FIELD) return game.name.toLocaleLowerCase();
      if (column === COLUMNS.STATUS.FIELD) return game.status?.label ?? '';
      if (column === COLUMNS.STEAM_SCORE.FIELD) {
        const totalReviews = game.positiveReviews + game.negativeReviews;
        return Math.floor((game.positiveReviews / totalReviews) * 100);
      }

      return game[column as keyof GameDto] as string | number;
    };

    return dataSource;
  });

  protected readonly COLUMNS = COLUMNS;
  protected readonly displayedColumns = [
    COLUMNS.JEU.FIELD,
    COLUMNS.PERSONNAL_SCORE.FIELD,
    COLUMNS.STEAM_SCORE.FIELD,
    COLUMNS.METACRITIC_SCORE.FIELD,
    COLUMNS.PLAY_TIME.FIELD,
    COLUMNS.STATUS.FIELD,
    COLUMNS.LAST_TIME_PLAYED.FIELD,
    COLUMNS.GENRES.FIELD,
    COLUMNS.RELEASE_DATE.FIELD,
    COLUMNS.INITIAL_PRICE.FIELD,
    COLUMNS.PERSONNAL_NOTES.FIELD,
    COLUMNS.EDIT.FIELD,
  ];

  protected onEdit(game: GameDto): void {
    return;
  }
}
