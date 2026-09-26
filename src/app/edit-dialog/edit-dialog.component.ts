import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { GameDto, GameStatusLabel } from '../../types/game.dto';

const SCORES_LABEL = {
  1: '???',
  2: "J'ai passé un mauvais moment",
  3: "C'était douloureux",
  4: 'Jamais je le relance',
  5: 'Ça paaaasse encore',
  6: 'Sympa mais je le recommanderai pas',
  7: "J'ai passé un bon moment",
  8: 'Vraiment un classique qui fait plaisir',
  9: "J'aimerai pouvoir y rejouer pour la première fois",
  10: "GOTY faut que j'en parle à tout le monde",
} as const;

@Component({
  imports: [
    MatDialogTitle,
    MatRadioModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSliderModule,
    MatButtonModule,
    NgOptimizedImage,
  ],
  selector: 'app-edit-dialog',
  styleUrl: './edit-dialog.component.css',
  templateUrl: './edit-dialog.component.html',
})
export class EditDialogComponent {
  protected readonly game: GameDto = inject(MAT_DIALOG_DATA);

  protected readonly allStatus: GameStatusLabel[] = ['100%', 'Finished', 'Unfinished', 'Abandoned'];

  protected readonly score = signal<keyof typeof SCORES_LABEL>(
    (this.game.personnalScore as keyof typeof SCORES_LABEL) ?? 7,
  );
  protected readonly selectedStatus = signal<GameStatusLabel | null>(
    this.game.status?.label ?? null,
  );
  protected readonly personnalNotes = signal(this.game.personnalNotes);

  protected readonly scoreLabel = computed(() => SCORES_LABEL[this.score()]);
}
