import { Entity, Column } from "typeorm";
import Model from "./model.entity";

@Entity("coasts_centers")
export class CoastCenter extends Model {
  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  context: number;

  @Column()
  user: number;

  toJSON() {
    return { ...this };
  }
}
