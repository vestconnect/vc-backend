import { inject, injectable } from "tsyringe";
import IPasswordsRepository from "../repositories/IPasswordsRepository";
import Password from "../infra/typeorm/entities/Password";

interface IRequest {
  user_id: string;
  page: number;
}

interface IReturnPasswords {
  passwords: Password[];
  total: number;
  total_pages: number;
}

@injectable()
class SelectPasswordServices {
  constructor(
    @inject("PasswordsRepository")
    private passwordsRepository: IPasswordsRepository
  ) {}

  public async execute({ user_id, page }: IRequest): Promise<IReturnPasswords> {
    const passwords = await this.passwordsRepository.find(user_id, page);

    return passwords;
  }
}

export default SelectPasswordServices;
