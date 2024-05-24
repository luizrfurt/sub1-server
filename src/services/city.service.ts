require("dotenv").config();
import AppError from "../utils/appError";
import { AppDataSource } from "../utils/dataSource";
import { City } from "../entities/city.entity";

const cityRepository = AppDataSource.getRepository(City);

// Get

export const getCitiesService = async () => {
  try {
    const cities = await cityRepository.find({ order: { name: "ASC" } });

    return cities;
  } catch (err: any) {
    throw new AppError(500, `Erro ao carregar cidades: ${err.message}`);
  }
};

// Create

// Update

// Delete

// Custom

export const getDefaultCityService = async () => {
  try {
    const defaultCity = await cityRepository.findOne({
      where: { name: "Dois Vizinhos" },
    });

    return defaultCity;
  } catch (err: any) {
    throw new AppError(500, `Erro ao carregar cidade padrão: ${err.message}`);
  }
};
