import { Entity, Column } from "typeorm";
import Model from "./model.entity";

@Entity("cost_centers")
export class CostCenter extends Model {
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
