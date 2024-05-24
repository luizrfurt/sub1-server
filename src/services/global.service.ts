import crypto from "crypto";
import fs from "fs";
import path from "path";
import AppError from "../utils/appError";

// Custom

export const uniqueFilenameService = async () => {
  try {
    const uuid = crypto.randomUUID();

    return uuid;
  } catch (err: any) {
    throw new AppError(
      500,
      `Erro ao gerar identificador para nome de arquivo: ${err.message}`
    );
  }
};

export const validStringBase64Service = async (
  stringBase64: any
): Promise<boolean> => {
  try {
    // Regex para verificar se a string está no formato base64 de uma imagem
    const regex = /^data:image\/([a-zA-Z]+);base64,([a-zA-Z0-9/+=]+={0,2})$/;
    if (!regex.test(stringBase64)) {
      // Se a string não estiver no formato correto, retorna false
      return false;
    }

    // deixa somente a string base64
    const base64Image = stringBase64.split(";base64,").pop();
    // extensão da imagem
    const extImage = stringBase64.split(";")[0].split("/")[1];
    // nome do arquivo
    const nameFile = "temp_file" + "." + extImage;
    // pasta do arquivo
    const folderFile = `${path.resolve().toString()}\\src\\upload`;
    // cria pasta \upload se a mesma não existir
    if (!fs.existsSync(folderFile)) {
      try {
        await fs.promises.mkdir(folderFile, { recursive: true });
      } catch (err: any) {
        throw new AppError(
          500,
          `Erro ao criar pasta de upload: ${err.message}`
        );
      }
    }

    // path do arquivo
    const pathFile = `${folderFile}\\${nameFile}`;

    try {
      fs.writeFile(pathFile, base64Image, "base64", function (err) {});
      //fs.unlinkSync(pathFile);
      await deleteFilesFromDirectoryService(folderFile);

      return true;
    } catch (error) {
      return false;
    }
  } catch (err: any) {
    throw new AppError(500, `Erro ao validar string base64: ${err.message}`);
  }
};

export const deleteFilesFromDirectoryService = async (
  directoryPath: string
) => {
  try {
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      fs.unlinkSync(filePath);
    }

    return files;
  } catch (err: any) {
    throw new AppError(500, `Erro ao limpar diretório: ${err.message}`);
  }
};

export const extractIdsService = async (jsonData: any): Promise<number[]> => {
  try {
    const arrayIds: number[] = [];

    for (const obj of jsonData) {
      arrayIds.push(obj.id);
    }

    return arrayIds;
  } catch (error: any) {
    throw new Error(`Erro ao extrair IDs do JSON: ${error.message}`);
  }
};

export const isJsonService = async (data: any): Promise<boolean> => {
  try {
    JSON.parse(data);
    return true;
  } catch (error) {
    return false;
  }
};

export const createTokenService = async () => {
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = await createHashTokenService(token);
  return { token, hashedToken };
};

export const createHashTokenService = async (token: string) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  return hashedToken;
};

export const formatDateExpiresInService = async (date: Date) => {
  try {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);

    const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

    return currentDateTime;
  } catch (err: any) {
    throw new AppError(500, `Erro ao formatar data: ${err.message}`);
  }
};
