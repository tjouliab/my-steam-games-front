import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GamesService } from './services/games.service';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App {
  gamesService = inject(GamesService);

  games$ = this.gamesService.get();
}
