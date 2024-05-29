import { Entity, Column, OneToMany } from "typeorm";
import Model from "./model.entity";
import { Team } from "./team.entity";

@Entity("companies")
export class Company extends Model {
  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  user: number;

  // Referência para tabela de teams
  @OneToMany(() => Team, (team) => team.company)
  teams: Team[];

  toJSON() {
    return { ...this };
  }
}
