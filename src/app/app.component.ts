import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SteamService } from './services/steam.service';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App {
  steamService = inject(SteamService);

  allFamilyGames$ = this.steamService.getAllFamilyGames();
}
