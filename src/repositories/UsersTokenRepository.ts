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
          const document = await this.userToken.find({ user: { $in: [user] } });
          if(!document) {
            return new UserToken({});
          }
          return new UserToken({ user: document[0].user, token: document[0].token });
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

    async deleteUserToken(usertoken: UserToken): Promise<boolean | undefined> {
      try {
          const document = await this.userToken.deleteOne({ usertoken });
          console.log('document delet', document);
          if(document.deletedCount === 0) {
            return false;
          }
          return true;
      } catch (err) {
        console.log('erro user bd', err);
        return undefined;
      }
    }

    async getUserToken(token: string): Promise<UserToken | undefined> {
        try {
            const document = await this.userToken.findOne({ token });
            if(document) {
              return new UserToken(document);
            }
            return undefined;
        } catch (err) {
          console.log('erro user bd', err);
          return undefined;
        }
      }
}

