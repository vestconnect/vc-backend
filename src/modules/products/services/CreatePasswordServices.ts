import { inject, injectable } from "tsyringe";
import IPasswordsRepository from "../repositories/IPasswordsRepository";
import path from "path";
import fs from "fs";
import uploadConfig from "@config/upload";
import xls from "read-excel-file/node";

interface IRequest {
  file: string;
  user_id: string;
}

interface IPassword {
  id: string;
}

@injectable()
class CreatePasswordServices {
  constructor(
    @inject("PasswordsRepository")
    private passwordsRepository: IPasswordsRepository
  ) {}

  public async execute({ file, user_id }: IRequest): Promise<void> {
    let passes: IPassword[] = [];

    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file)
    );

    const xlsTags = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "tmp",
      "uploads",
      file
    );

    const rows = await xls(xlsTags);

    rows.forEach((col: any) => {
      col.forEach((data: any) => {
        passes.push({ id: data });
      });
    });

    for (const pass of passes) {
      await this.passwordsRepository.create(pass.id, user_id);
    }
  }
}

export default CreatePasswordServices;
