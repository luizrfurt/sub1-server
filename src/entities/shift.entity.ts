import { Entity, Column } from "typeorm";
import Model from "./model.entity";

@Entity("shifts")
export class Shift extends Model {
  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  user: number;
  team: import("c:/prime/Sub1/sub1-server/src/entities/team.entity").Team;
  company: import("c:/prime/Sub1/sub1-server/src/entities/company.entity").Company;

  toJSON() {
    return { ...this };
  }
}
