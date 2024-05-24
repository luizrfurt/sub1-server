require("dotenv").config();
import AppError from "../utils/appError";
import { AppDataSource } from "../utils/dataSource";
import { State } from "../entities/state.entity";

const stateRepository = AppDataSource.getRepository(State);

// Get

export const getStatesService = async () => {
  try {
    const states = await stateRepository.find({ order: { name: "ASC" } });

    return states;
  } catch (err: any) {
    throw new AppError(500, `Erro ao carregar países: ${err.message}`);
  }
};

// Create

// Update

// Delete

// Custom
