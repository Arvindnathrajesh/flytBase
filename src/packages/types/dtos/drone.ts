import { STATE } from './site';

export class Drone {
  droneId: string;
  siteId: string;
  deletedBy: number;
  deletedOn: Date;
  droneType: string;
  makeName: string;
  name: string;
  state: STATE;
}
