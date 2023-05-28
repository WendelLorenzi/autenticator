import { UserToken } from "../../entities/UserToken";

export interface IUsersTokenRepository {
    create(user: UserToken): Promise<void>;
    TokenExist(userId: string): Promise<UserToken | undefined>;
    updateToken(userId: string, newToken: string): Promise<void>;
    deleteUserToken(usertoken: string): Promise<boolean | undefined>;
    getUserToken(token: string): Promise<UserToken | undefined>;
  }