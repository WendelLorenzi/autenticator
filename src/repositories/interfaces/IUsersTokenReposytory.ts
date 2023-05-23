import { User } from "../../entities/User";
import { UserToken } from "../../entities/UserToken";

export interface IUsersTokenRepository {
    create(user: UserToken): Promise<void>;
    TokenExist(user: User): Promise<UserToken | undefined>;
    updateToken(user: User, newToken: string): Promise<void>;
  }