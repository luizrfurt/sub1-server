import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import Model from "./model.entity";
import { State } from "./state.entity";

@Entity("cities")
export class City extends Model {
  @ManyToOne(() => State, (state) => state.cities, { eager: true })
  state: State;

  @Column()
  name: string;

  toJSON() {
    return { ...this };
  }
}
