import { KeyValuePipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormField, FormRoot, form, max, min, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { GameStatusService } from '../../services/game-status.service';
import { GameDto, GameEditBody } from '../../types/game.dto';

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

export type GameScore = keyof typeof SCORES_LABEL;

function isGameScore(score: number | null): score is GameScore {
  return score !== null && Number.isInteger(score) && score >= 1 && score <= 10;
}

@Component({
  imports: [
    MatDialogTitle,
    MatRadioModule,
    MatFormFieldModule,
    FormField,
    FormRoot,
    MatInputModule,
    MatDialogContent,
    MatDialogActions,
    MatSliderModule,
    MatButtonModule,
    KeyValuePipe,
    NgOptimizedImage,
  ],
  selector: 'app-edit-dialog',
  styleUrl: './edit-dialog.component.css',
  templateUrl: './edit-dialog.component.html',
})
export class EditDialogComponent {
  private readonly dialogRef =
    inject<MatDialogRef<EditDialogComponent, GameEditBody>>(MatDialogRef);
  protected readonly game: GameDto = inject(MAT_DIALOG_DATA);
  private readonly gameStatusService = inject(GameStatusService);

  protected readonly allStatus = this.gameStatusService.allGameStatus;

  protected readonly editModel = signal<GameEditBody>({
    personnalScore: isGameScore(this.game.personnalScore) ? this.game.personnalScore : 7,
    statusId: this.game.status?.id ?? 1,
    personnalNotes: this.game.personnalNotes ?? '',
  });

  protected readonly editForm = form(
    this.editModel,
    (game) => {
      min(game.personnalScore, 1);
      max(game.personnalScore, 10);
      required(game.statusId, { message: "Le niveau d'avancement est obligatoire" });
    },
    {
      name: 'edit-game',
      submission: {
        action: async (form) => {
          const value = form().value();

          if (value.statusId !== null) {
            this.dialogRef.close({ ...value, statusId: value.statusId });
          }
        },
      },
    },
  );

  protected readonly scoreLabel = computed(() => {
    const personnalScore = this.editModel().personnalScore;
    if (!isGameScore(personnalScore)) return 'Inconnu';
    return SCORES_LABEL[personnalScore];
  });
}
