import { inject, injectable } from "tsyringe";
import IPasswordsRepository from "../repositories/IPasswordsRepository";

@injectable()
class UpdateActivePasswordsServices {
  constructor(
    @inject("PasswordsRepository")
    private passwordsRepository: IPasswordsRepository
  ) {}

  public async execute(id: string, user_id: string): Promise<void> {
    if (id) {
      await this.passwordsRepository.inactivePassword(id);

      return;
    }

    await this.passwordsRepository.inactiveAll(user_id);
  }
}

export default UpdateActivePasswordsServices;
