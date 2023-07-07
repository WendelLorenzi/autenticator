import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/interfaces/IUsersTokenReposytory";
import { LogoutRequestDTO } from "./LogoutDTO";

export class LogoutUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private usersTokenRepository: IUsersTokenRepository,
    ) {}
    async execute(
        data: LogoutRequestDTO
    ) {
        if (data._id) {
            const userById = await this.usersRepository.findById(data._id);
            if (userById) {
                return this._userVerify(userById);
            }
            throw new Error('Not parameters required');
        }
        throw new Error('user not exists');
    }
    
    private async _userVerify(user: User) {
        if (user) {
            const userTokenAlreadExists = await this.usersTokenRepository.TokenExist(user._id);
            if (userTokenAlreadExists != (undefined && {})) {
                if(await this.usersTokenRepository.deleteUserToken(userTokenAlreadExists.token)) {
                    return true;
                }
                return false;
            }
            return false;
        }
    }
}
