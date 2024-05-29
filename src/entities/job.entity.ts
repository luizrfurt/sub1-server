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

  toJSON() {
    return { ...this };
  }
}