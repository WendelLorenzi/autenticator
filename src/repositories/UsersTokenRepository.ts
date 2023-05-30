import { ImongoFindOneTokenDTO, UserToken } from "../entities/UserToken";
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

    async TokenExist(userid: string): Promise<UserToken | undefined> {
      try {
          const document = await this.userToken.findOne({ userId: userid });
          if(!document) {
            return undefined;
          }
          return new UserToken({ userId: document.userId, token: document.token });
      } catch (err) {
        console.log('erro user bd', err);
      }
    }

    async updateToken(userId: string, newToken: string): Promise<void> {
      try {
          await this.userToken.findOneAndUpdate(
            { 'userId': userId },
            { $set: { token: newToken } },
            { new: true }
            );
      } catch (err) {
        console.log('erro user bd', err);
      }
    }

    async deleteUserToken(usertoken: string): Promise<boolean | undefined> {
      try {
          const document = await this.userToken.deleteOne({ token: usertoken });
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
            const document = await this.userToken.findOne({ token }).exec();
            if(document) {
                const doc = new ImongoFindOneTokenDTO(document);
                return new UserToken({ user: doc.user, token: doc.token });
            }
            return undefined;
        } catch (err) {
          console.log('erro user bd', err);
          return undefined;
        }
      }
}