require("dotenv").config();
import { CoastCenter } from "../entities/coastCenter.entity";
import { Company } from "../entities/company.entity";
import { Job } from "../entities/job.entity";
import { Shift } from "../entities/shift.entity";
import { Team } from "../entities/team.entity";
import AppError from "../utils/appError";

// Get

// Create

export const initializeService = async (userId: number) => {
  try {
    // Company
    const newCompany = new Company();
    newCompany.code = "0001";
    newCompany.name = "EMPRESA DEMONSTRAÇÃO";
    newCompany.user = userId;
    await newCompany.save();

    // Team
    const newTeam = new Team();
    newTeam.company = newCompany;
    newTeam.code = "0001";
    newTeam.name = "EQUIPE DEMONSTRAÇÃO";
    newTeam.user = userId;
    await newTeam.save();

    // Shift
    const newShift = new Shift();
    newShift.code = "0001";
    newShift.name = "TURNO DEMONSTRAÇÃO";
    newShift.user = userId;
    await newShift.save();


    // Job
    const newJob = new Job();
    newJob.code = "0001";
    newJob.name = "CARGO DEMONSTRAÇÃO";
    newJob.user = userId;
    await newJob.save();


    // Coast-Center
    const newCoastCenter = new CoastCenter();
    newCoastCenter.code = "0001";
    newCoastCenter.name = "CENTRO DE CUSTO DEMONSTRAÇÃO";
    newCoastCenter.user = userId;
    await newCoastCenter.save();


    return [{
      company: newCompany,
      team: newTeam,
      shift: newShift,
      job: newJob,
      coastCenter: newCoastCenter,
    }];
  } catch (err: any) {
    throw new AppError(500, `Erro ao inicializar estruturas: ${err.message}`);
  }
};

// Update

// Delete

// Custom
