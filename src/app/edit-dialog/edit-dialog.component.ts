import { NgOptimizedImage } from '@angular/common';
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

export type GameScore = keyof typeof SCORES_LABEL;

interface EditDialogModel {
  personnalScore: GameScore;
  status: GameStatusLabel | null;
  personnalNotes: string;
}

export type EditDialogResult = EditDialogModel & { status: GameStatusLabel };

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
    NgOptimizedImage,
  ],
  selector: 'app-edit-dialog',
  styleUrl: './edit-dialog.component.css',
  templateUrl: './edit-dialog.component.html',
})
export class EditDialogComponent {
  private readonly dialogRef =
    inject<MatDialogRef<EditDialogComponent, EditDialogResult>>(MatDialogRef);
  protected readonly game: GameDto = inject(MAT_DIALOG_DATA);

  protected readonly allStatus: GameStatusLabel[] = ['100%', 'Finished', 'Unfinished', 'Abandoned'];

  protected readonly editModel = signal<EditDialogModel>({
    personnalScore: isGameScore(this.game.personnalScore) ? this.game.personnalScore : 7,
    status: this.game.status?.label ?? null,
    personnalNotes: this.game.personnalNotes ?? '',
  });

  protected readonly editForm = form(
    this.editModel,
    (game) => {
      min(game.personnalScore, 1);
      max(game.personnalScore, 10);
      required(game.status, { message: "Le niveau d'avancement est obligatoire" });
    },
    {
      name: 'edit-game',
      submission: {
        action: async (form) => {
          const value = form().value();

          if (value.status !== null) {
            this.dialogRef.close({ ...value, status: value.status });
          }
        },
      },
    },
  );

  protected readonly scoreLabel = computed(() => SCORES_LABEL[this.editModel().personnalScore]);
}
