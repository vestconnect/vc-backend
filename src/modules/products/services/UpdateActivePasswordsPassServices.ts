import { inject, injectable } from "tsyringe";
import IPasswordsRepository from "../repositories/IPasswordsRepository";
import Password from "../infra/typeorm/entities/Password";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class UpdateActivePasswordsServices {
  constructor(
    @inject("PasswordsRepository")
    private passwordsRepository: IPasswordsRepository
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<Password> {
    const pass = await this.passwordsRepository.findByPass(id);

    if (!pass) {
      throw new AppError("Password inválido.", 400);
    }

    if (!pass.active) {
      throw new AppError("Password já utilizado.", 400);
    }

    const password = await this.passwordsRepository.inactiveByPass(id, user_id);

    return password;
  }
}

export default UpdateActivePasswordsServices;
