import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import Model from "./model.entity";
import { Country } from "./country.entity";
import { City } from "./city.entity";

@Entity("states")
export class State extends Model {
  @ManyToOne(() => Country, (country) => country.states, { eager: true })
  country: Country;

  @Column()
  name: string;

  @Column()
  uf: string;

  // Referência para tabela de cities
  @OneToMany(() => City, (city) => city.state)
  cities: City[];

  toJSON() {
    return { ...this };
  }
}
