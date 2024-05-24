import { Entity, Column, OneToMany } from "typeorm";
import Model from "./model.entity";
import { State } from "./state.entity";

@Entity("countries")
export class Country extends Model {
  @Column()
  name: string;

  @Column()
  code: string;

  // Referência para tabela de states
  @OneToMany(() => State, (state) => state.country)
  states: State[];

  toJSON() {
    return { ...this };
  }
}
