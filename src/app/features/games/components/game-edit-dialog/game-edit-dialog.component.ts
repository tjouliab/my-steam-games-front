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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { firstValueFrom } from 'rxjs';
import { GameStatusService } from '../../services/game-status.service';
import { GamesService } from '../../services/games.service';
import { GameDto, GameEditBody } from '../../types/game.types';
import { GameEditDialogOutput } from './game-edit-dialog-output';

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

type GameScore = keyof typeof SCORES_LABEL;

type FormEdit = Omit<GameEditBody, 'id'> & {
  personnalNotes: string;
};

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
    MatProgressSpinnerModule,
    KeyValuePipe,
    NgOptimizedImage,
  ],
  selector: 'app-game-edit-dialog',
  styleUrl: './game-edit-dialog.component.css',
  templateUrl: './game-edit-dialog.component.html',
})
export class GameEditDialogComponent {
  protected readonly game: GameDto = inject(MAT_DIALOG_DATA);
  private readonly gamesService = inject(GamesService);
  private readonly gameStatusService = inject(GameStatusService);
  private readonly dialogRef =
    inject<MatDialogRef<GameEditDialogComponent, GameEditDialogOutput>>(MatDialogRef);

  protected readonly allStatus = this.gameStatusService.allGameStatus;

  protected readonly editModel = signal<FormEdit>({
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
          const hasChanged = this.hasChanged();
          if (hasChanged) {
            await firstValueFrom(
              this.gamesService.editOne({ ...form().value(), id: this.game.id }),
            );
          }
          this.dialogRef.close({ reload: hasChanged });
        },
      },
    },
  );

  protected readonly scoreLabel = computed(() => {
    const personnalScore = this.editModel().personnalScore;
    if (!isGameScore(personnalScore)) return 'Inconnu';
    return SCORES_LABEL[personnalScore];
  });

  private hasChanged(): boolean {
    const newValues = this.editForm().value();
    return (
      this.game.personnalScore !== newValues.personnalScore ||
      this.game.personnalNotes !== newValues.personnalNotes ||
      this.game.status?.id !== newValues.statusId
    );
  }
}
