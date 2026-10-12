import type { AppEnvironment } from './environment.types';

export const environment = {
  backendURL: 'http://localhost:3000',
} as const satisfies AppEnvironment;
