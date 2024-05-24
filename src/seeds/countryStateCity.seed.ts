import axios from "axios";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";
import { Country } from "../entities/country.entity";
import { State } from "../entities/state.entity";
import { City } from "../entities/city.entity";

export default class CountryStateCitySeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    // Repositories
    const countryRepository = dataSource.getRepository(Country);
    const stateRepository = dataSource.getRepository(State);
    const cityRepository = dataSource.getRepository(City);

    // If counts > 0, dont run again
    const countryCount = await countryRepository.count();
    const stateCount = await stateRepository.count();
    const cityCount = await cityRepository.count();
    if (countryCount !== 0 || stateCount !== 0 || cityCount !== 0) {
      return;
    }

    // 1. Countries
    console.log("Seeding countries...");
    interface CountryData {
      id: {
        "ISO-ALPHA-3": string;
      };
      nome: string;
    }
    const responseCountries = await axios.get<CountryData[]>(
      "https://servicodados.ibge.gov.br/api/v1/localidades/paises?orderBy=nome"
    );
    const countriesData = responseCountries.data.map((country) => ({
      name: country.nome,
      code: country.id["ISO-ALPHA-3"],
    }));

    const countries = await Promise.all(
      countriesData.map(async (country) => {
        const newCountry = countryRepository.create({
          name: country.name,
          code: country.code,
        });
        return await countryRepository.save(newCountry);
      })
    );

    // 2. States
    console.log("Seeding states...");
    interface StateData {
      nome: string;
      sigla: string;
    }
    const responseStates = await axios.get<StateData[]>(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
    );
    const statesData = responseStates.data.map((state) => ({
      name: state.nome,
      uf: state.sigla,
      countryCode: "BRA",
    }));

    const states = await Promise.all(
      statesData.map(async (state) => {
        const country = countries.find(
          (country) => country.code === state.countryCode
        );
        const newState = stateRepository.create({
          name: state.name,
          uf: state.uf,
          country: country,
        });
        return await stateRepository.save(newState);
      })
    );

    // 3. Cities
    console.log("Seeding cities...");
    interface CityData {
      nome: string;
      microrregiao: {
        mesorregiao: {
          UF: {
            sigla: string;
          };
        };
      };
    }
    const responseCities = await axios.get<CityData[]>(
      "https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome"
    );
    const citiesData = responseCities.data.map((city) => ({
      name: city.nome,
      stateUf: city.microrregiao.mesorregiao.UF.sigla,
    }));

    await Promise.all(
      citiesData.map(async (city) => {
        const state = states.find((state) => state.uf === city.stateUf);
        if (state) {
          const newCity = cityRepository.create({ name: city.name, state });
          return await cityRepository.save(newCity);
        }
      })
    );
  }
}
