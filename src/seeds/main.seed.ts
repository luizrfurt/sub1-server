import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager, runSeeder } from "typeorm-extension";
import CountryStateCitySeeder from "./countryStateCity.seed";

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    await runSeeder(dataSource, CountryStateCitySeeder);
  }
}
