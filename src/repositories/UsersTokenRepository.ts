import { User } from "../entities/User";
import { UserToken } from "../entities/UserToken";
import modelUsersToken from "../providers/mongoDB/UserTokenModel";
import { IUsersTokenRepository } from "./interfaces/IUsersTokenReposytory";

export class UsersTokenRepository implements IUsersTokenRepository {
  private userToken = modelUsersToken;

    async create(usertoken: UserToken): Promise<void> {
      try {
          const document = await this.userToken.create(usertoken);
          return document.toObject();
      } catch (err) {
        console.log('erro user bd', err);
      }
    }

    async TokenExist(user: User): Promise<UserToken | undefined> {
      try {
          const document = await this.userToken.findOne({ user: user });
          if(!document) {
            return new UserToken({});
          }
          return document;
      } catch (err) {
        console.log('erro user bd', err);
      }
    }

    async updateToken(user: User, newToken: string): Promise<void> {
      try {
          await this.userToken.findOneAndUpdate(
            { 'user': user },
            { $set: { token: newToken } },
            { new: true }
            );
      } catch (err) {
        console.log('erro user bd', err);
      }
    }
}

