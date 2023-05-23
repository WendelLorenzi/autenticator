import { User } from "../../entities/User";

export interface IUsersRepository {
    create(user: User): Promise<void>;
    findByEmail(email: string): Promise<User>;
    UserAlreadExists(mail: string): Promise<boolean>;
    findById(id: string): Promise<User>;
  }