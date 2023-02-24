import { STATE } from './site';

export class Waypoint {
  alt: number;
  lat: number;
  lng: number;
}
export class Mission {
  missionId: string;
  alt: number;
  speed: number;
  name: string;
  waypoints: [Waypoint];
  siteId: string;
  // droneId: string;
  categoryId: string;
  state: STATE;
}
