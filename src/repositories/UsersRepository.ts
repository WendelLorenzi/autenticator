import { User } from "../entities/User";
import modelUsers from "../providers/mongoDB/UserModel";
import { IUsersRepository } from "./interfaces/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private user = modelUsers;

    async create(user: User): Promise<void> {
      try {
          const document = await this.user.create(user);
          return document.toObject();
      } catch (err) {
        console.log('erro user bd', err);
      }
    }

    async findByEmail(mail: string): Promise<User | null> {
      try {
          const document = await this.user.findOne({ email: mail }).exec();
          if (!document) {
            throw new Error('User not found');
          }
          const user = new User({ name: document?.name.valueOf(), email: document?.email.valueOf() , password: document?.password.valueOf() }, document?._id.valueOf());
          return user;
      } catch (err) {
        console.log('Error accessing user in the database:', err);
        throw err;
      }
    }

    async findById(id: string): Promise<User> {
      try {
          const document = await this.user.findOne({ _id: id });
          if (!document) {
            throw new Error('User not found');
          }
          return document;
      } catch (err) {
        console.log('Error accessing user in the database:', err);
        throw err;
      }
    }

    async UserAlreadExists(mail: string): Promise<boolean> {
      try {
          const document = await this.user.findOne({email: mail});
          if (!document) {
            return false;
          }
          return true;
      } catch (err) {
        console.log('Error accessing user in the database:', err);
        throw err;
      }
    }
}