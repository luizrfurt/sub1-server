require("dotenv").config();
import AppError from "../utils/appError";
import { AppDataSource } from "../utils/dataSource";
import { Country } from "../entities/country.entity";

const countryRepository = AppDataSource.getRepository(Country);

// Get

export const getCountriesService = async () => {
  try {
    const countries = await countryRepository.find({ order: { name: "ASC" } });

    return countries;
  } catch (err: any) {
    throw new AppError(500, `Erro ao carregar países: ${err.message}`);
  }
};

// Create

// Update

// Delete

// Custom
