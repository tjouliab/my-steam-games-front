import { Component, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { GamesTableComponent } from './features/games/components/games-table/games-table.component';

@Component({
  selector: 'app-root',
  imports: [GamesTableComponent],
  templateUrl: './app.component.html',
})
export class App {
  private readonly iconRegistry = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);

  constructor() {
    this.iconRegistry.addSvgIcon(
      'sigma',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/sigma.svg'),
    );

    this.iconRegistry.addSvgIcon(
      'average',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/average.svg'),
    );
  }
}
