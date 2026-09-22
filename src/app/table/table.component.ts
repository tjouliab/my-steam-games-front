import { Component, inject } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { TableRowComponent } from './table-row/table-row.component';

@Component({
  imports: [TableRowComponent],
  selector: 'app-table',
  styleUrl: './table.component.css',
  templateUrl: './table.component.html',
})
export class TableComponent {
  private readonly gamesService = inject(GamesService);

  protected readonly allGames = this.gamesService.allGames;
}
