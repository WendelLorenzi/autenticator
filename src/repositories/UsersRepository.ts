import { User } from "../entities/User";
import modelUsers from "../providers/mongoDB/UserModel";
import { IUsersRepository } from "./interfaces/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private user = modelUsers;

    async create(user: User): Promise<void> {
      try {
          const document = await this.user.create(user);
          console.log('repository', document.toObject());
          return document.toObject();
      } catch (err) {
        console.log('erro user bd', err);
      }
    }
}