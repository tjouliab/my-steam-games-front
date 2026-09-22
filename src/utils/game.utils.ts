import { GameDto } from '../types/game.dto';

export function getIcon(game: GameDto): string {
  return `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.id}/header.jpg?t=${game.imgIconUrl}`;
}

export function getSteamNotation(game: GameDto): number {
  const totalReviews = game.positiveReviews + game.negativeReviews;
  return Math.floor((game.positiveReviews / totalReviews) * 100);
}