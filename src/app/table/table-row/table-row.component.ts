import { Component, computed, input } from '@angular/core';
import { GameDto } from '../../../types/game.dto';
import { getIcon, getSteamNotation } from '../../../utils/game.utils';

@Component({
  imports: [],
  selector: 'app-table-row',
  styleUrl: './table-row.component.css',
  templateUrl: './table-row.component.html',
})
export class TableRowComponent {
  public readonly game = input.required<GameDto>();

  protected readonly imgSrc = computed(() => getIcon(this.game()));
  protected readonly steamNotation = computed(() => getSteamNotation(this.game()));
  protected readonly genres = computed(() =>
    this.game()
      .genres.map((genre) => genre.description)
      .join(', '),
  );
}
