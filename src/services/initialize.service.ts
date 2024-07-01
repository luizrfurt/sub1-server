require("dotenv").config();
import { CostCenter } from "../entities/costCenter.entity";
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

    // Cost-Center
    const newCostCenter = new CostCenter();
    newCostCenter.code = "0001";
    newCostCenter.name = "CENTRO DE CUSTO DEMONSTRAÇÃO";
    newCostCenter.user = userId;
    await newCostCenter.save();

    return [
      {
        company: newCompany,
        team: newTeam,
        shift: newShift,
        job: newJob,
        costCenter: newCostCenter,
      },
    ];
  } catch (err: any) {
    throw new AppError(500, `Erro ao inicializar estruturas: ${err.message}`);
  }
};

// Update

// Delete

// Custom
