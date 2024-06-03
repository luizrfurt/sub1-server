import { Entity, Column } from "typeorm";
import Model from "./model.entity";

@Entity("jobs")
export class Job extends Model {
  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  user: number;
  team: import("c:/prime/Sub1/sub1-server/src/entities/team.entity").Team;
  company: import("c:/prime/Sub1/sub1-server/src/entities/company.entity").Company;
  shift: import("c:/prime/Sub1/sub1-server/src/entities/shift.entity").Shift;

  toJSON() {
    return { ...this };
  }
}
