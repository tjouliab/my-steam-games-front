import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, viewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GenresPipe } from '../../pipes/genres.pipe';
import { LastTimePlayedPipe } from '../../pipes/last-time-played.pipe';
import { PlayTimePipe } from '../../pipes/play-time.pipe';
import { SteamScorePipe } from '../../pipes/steam-score.pipe';
import { GamesService } from '../../services/games.service';
import { GameDto } from '../../types/game.dto';

const COLUMNS_NAME = {
  JEU: 'jeu',
  PERSONNAL_SCORE: 'personnalScore',
  STEAM_SCORE: 'steamScore',
  METACRITIC_SCORE: 'metacriticScore',
  PLAY_TIME: 'playTime',
  STATUS: 'status',
  LAST_TIME_PLAYED: 'lastTimePlayed',
  GENRES: 'genres',
  RELEASE_DATE: 'releaseDate',
  INITIAL_PRICE: 'initialPrice',
  PERSONNAL_NOTES: 'personnalNotes',
} as const;

type ColumnsNames = (typeof COLUMNS_NAME)[keyof typeof COLUMNS_NAME];

@Component({
  imports: [
    MatTableModule,
    MatSortModule,
    SteamScorePipe,
    GenresPipe,
    LastTimePlayedPipe,
    CurrencyPipe,
    PlayTimePipe,
    NgOptimizedImage,
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
      if (column === COLUMNS_NAME.JEU) return game.name.toLocaleLowerCase();
      if (column === COLUMNS_NAME.STATUS) return game.status?.label ?? '';
      if (column === COLUMNS_NAME.STEAM_SCORE) {
        const totalReviews = game.positiveReviews + game.negativeReviews;
        return Math.floor((game.positiveReviews / totalReviews) * 100);
      }

      return game[column as keyof GameDto] as string | number;
    };

    return dataSource;
  });

  protected readonly displayedColumns: ColumnsNames[] = [
    COLUMNS_NAME.JEU,
    COLUMNS_NAME.PERSONNAL_SCORE,
    COLUMNS_NAME.STEAM_SCORE,
    COLUMNS_NAME.METACRITIC_SCORE,
    COLUMNS_NAME.PLAY_TIME,
    COLUMNS_NAME.STATUS,
    COLUMNS_NAME.LAST_TIME_PLAYED,
    COLUMNS_NAME.GENRES,
    COLUMNS_NAME.RELEASE_DATE,
    COLUMNS_NAME.INITIAL_PRICE,
    COLUMNS_NAME.PERSONNAL_NOTES,
  ];
}
