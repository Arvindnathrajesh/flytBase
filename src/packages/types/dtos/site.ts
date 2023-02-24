export enum STATE {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class Position {
  latitude: number;
  longitude: number;
}

export class Site {
  siteId: string;
  userId: number;
  siteName: string;
  position: Position;
  state: STATE;
}
