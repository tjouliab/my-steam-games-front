import { GameDto, GameStatusLabel } from '../types/game.types';

export abstract class GameUtils {
  static getSteamScore(game: GameDto): number {
    const totalReviews = game.positiveReviews + game.negativeReviews;
    return game.positiveReviews / totalReviews;
  }

  static needsEdit(game: GameDto): boolean {
    return game.personnalScore == null || game.status == null;
  }

  static calculateSum(
    games: GameDto[] | undefined,
    callbackfn: (game: GameDto) => number | null,
  ): number {
    if (games == null) return 0;

    return games.reduce((acc, game) => (acc += callbackfn(game) ?? 0), 0);
  }

  static calculateAvg(
    games: GameDto[] | undefined,
    callbackfn: (game: GameDto) => number | null,
  ): number {
    if (games == null) return 0;

    // Do not take into account unset values
    const filteredGames = games.filter((game) => callbackfn(game) != null);
    if (filteredGames.length === 0) return 0;

    const sum = GameUtils.calculateSum(filteredGames, callbackfn);
    return sum / filteredGames.length;
  }

  static countByStatus(games: GameDto[]): Map<GameStatusLabel | 'total', number> {
    const statusLabels: GameStatusLabel[] = ['100%', 'Finished', 'Unfinished', 'Abandoned'];
    const countByStatus = new Map<GameStatusLabel | 'total', number>();

    let total = 0;
    for (const label of statusLabels) {
      const count = games.filter((game) => game.status?.label === label).length;
      countByStatus.set(label, count);
      total += count;
    }
    countByStatus.set('total', total);

    return countByStatus;
  }

  static finishedPercentage(games: GameDto[] | undefined): number {
    if (games == null) return 0;

    const statusMap = GameUtils.countByStatus(games);

    if (!statusMap.has('Unfinished') || !statusMap.has('total') || statusMap.get('total') === 0)
      return 1;

    return 1 - statusMap.get('Unfinished')! / statusMap.get('total')!;
  }

  static countNeedsEdit(games: GameDto[] | undefined): number {
    if (games == null) return 0;

    return games.filter(GameUtils.needsEdit).length;
  }
}
