import { STATE } from './site';

export class Drone {
  droneId: string;
  siteId: string;
  userId: number;
  deletedBy: number;
  deletedOn: Date;
  droneType: string;
  makeName: string;
  name: string;
  state: STATE;
}
