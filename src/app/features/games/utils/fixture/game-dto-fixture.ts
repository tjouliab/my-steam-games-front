import { GameDto } from '../../types/game.types';

const ponyIslandFixture = {
  name: 'Pony Island',
  id: 405640,
  genres: [
    {
      id: 23,
      description: 'Indépendant',
    },
  ],
  imgIconUrl:
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/405640/header.jpg?t=1790965415',
  backgroundUrl:
    'https://store.akamai.steamstatic.com/images/storepagebackground/app/405640?t=1790965415',
  metacriticScore: 86,
  positiveReviews: 17251,
  negativeReviews: 919,
  playTime: 0,
  lastTimePlayed: 0,
  releaseDate: '2016-01-04',
  initialPrice: 499,
  personnalScore: null,
  personnalNotes: '',
  createdAt: '2026-09-16T20:38:17Z',
  updatedAt: '2026-10-06T20:05:26Z',
  visibility: {
    id: 3,
    label: 'Hidden Default',
  },
  status: null,
} satisfies GameDto;

const oneShotFixture = {
  name: 'OneShot',
  id: 420530,
  genres: [
    {
      id: 4,
      description: 'Occasionnel',
    },
    {
      id: 23,
      description: 'Indépendant',
    },
    {
      id: 25,
      description: 'Aventure',
    },
  ],
  imgIconUrl:
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/420530/header.jpg?t=1785326211',
  backgroundUrl:
    'https://store.akamai.steamstatic.com/images/storepagebackground/app/420530?t=1785326211',
  metacriticScore: 80,
  positiveReviews: 64374,
  negativeReviews: 1159,
  playTime: 84,
  lastTimePlayed: 1733017917,
  releaseDate: '2016-12-08',
  initialPrice: 975,
  personnalScore: null,
  personnalNotes: '',
  createdAt: '2026-09-16T20:38:17Z',
  updatedAt: '2026-10-06T20:05:27Z',
  visibility: {
    id: 1,
    label: 'Visible',
  },
  status: null,
} satisfies GameDto;

const theRoomFixture = {
  name: 'The Room Two',
  id: 425580,
  genres: [
    {
      id: 23,
      description: 'Indépendant',
    },
    {
      id: 25,
      description: 'Aventure',
    },
  ],
  imgIconUrl:
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/425580/header.jpg?t=1646758355',
  backgroundUrl:
    'https://store.akamai.steamstatic.com/images/storepagebackground/app/425580?t=1646758355',
  metacriticScore: null,
  positiveReviews: 21311,
  negativeReviews: 539,
  playTime: 0,
  lastTimePlayed: 0,
  releaseDate: '2016-07-05',
  initialPrice: 499,
  personnalScore: null,
  personnalNotes: '',
  createdAt: '2026-09-16T20:38:18Z',
  updatedAt: '2026-10-06T20:05:27Z',
  visibility: {
    id: 3,
    label: 'Hidden Default',
  },
  status: null,
} satisfies GameDto;

const aBlindLedengFixture = {
  name: 'A Blind Legend',
  id: 437530,
  genres: [
    {
      id: 1,
      description: 'Action',
    },
    {
      id: 23,
      description: 'Indépendant',
    },
    {
      id: 25,
      description: 'Aventure',
    },
  ],
  imgIconUrl:
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/437530/header.jpg?t=1781884812',
  backgroundUrl:
    'https://store.akamai.steamstatic.com/images/storepagebackground/app/437530?t=1781884812',
  metacriticScore: null,
  positiveReviews: 260,
  negativeReviews: 90,
  playTime: 85,
  lastTimePlayed: 1744142113,
  releaseDate: '2016-04-07',
  initialPrice: 699,
  personnalScore: null,
  personnalNotes: '',
  createdAt: '2026-09-16T20:38:18Z',
  updatedAt: '2026-10-06T20:05:28Z',
  visibility: {
    id: 1,
    label: 'Visible',
  },
  status: null,
} satisfies GameDto;

export const gamesDtoFixture = [
  ponyIslandFixture,
  oneShotFixture,
  theRoomFixture,
  aBlindLedengFixture,
] satisfies GameDto[];
