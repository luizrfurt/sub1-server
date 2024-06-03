import { Entity, Column } from "typeorm";
import Model from "./model.entity";

@Entity("coasts_centers")
export class CoastCenter extends Model {
  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  user: number;
  company: import("c:/prime/Sub1/sub1-server/src/entities/company.entity").Company;
  team: import("c:/prime/Sub1/sub1-server/src/entities/team.entity").Team;
  shift: import("c:/prime/Sub1/sub1-server/src/entities/shift.entity").Shift;

  toJSON() {
    return { ...this };
  }
}
