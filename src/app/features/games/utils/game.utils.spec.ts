import { GameDto } from '../types/game.types';
import { gamesDtoFixture } from './fixture/game-dto-fixture';
import { GameUtils } from './game.utils';

describe('calculateSum', () => {
  it('should sum on initialPrice', () => {
    const callbackfn = (game: GameDto): number => game.initialPrice;
    const sum = GameUtils.calculateSum(gamesDtoFixture, callbackfn);
    expect(sum).toEqual(2672);
  });
});
