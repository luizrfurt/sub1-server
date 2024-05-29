import { Entity, Column, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { Company } from "./company.entity";

@Entity("teams")
export class Team extends Model {
  @ManyToOne(() => Company, (company) => company.teams, { eager: true })
  company: Company;

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
