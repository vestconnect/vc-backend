import Password from "../infra/typeorm/entities/Password";

interface IReturnPasswords {
  passwords: Password[];
  total: number;
  total_pages: number;
}

export default interface IPasswordsRepository {
  find(user_id: string, page: number): Promise<IReturnPasswords>;
  findByPass(pass: string): Promise<Password | undefined>;
  findActivePasswords(user_id: string): Promise<Password[]>;
  create(pass: string, user_id: string): Promise<Password>;
  save(Password: Password): Promise<Password>;
  inactivePassword(id: string): Promise<Password>;
  inactiveAll(user_id: string): Promise<Password[]>;
  inactiveByPass(pass: string, user_id: string): Promise<Password>;
}
