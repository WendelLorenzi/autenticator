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
        if (data._id && data.email) {
            const userById = await this.usersRepository.findById(data._id);
            if (userById) {
                return this._userVerify(userById);
            }
            const userByEmail = await this.usersRepository.findByEmail(data.email);
            if (userByEmail) return this._userVerify(userByEmail);
            throw new Error('Not parameters required');
        }
        if(data._id) {
            const user = await this.usersRepository.findById(data._id);
            return this._userVerify(user);
        }
        if(data.email) {
            const user = await this.usersRepository.findByEmail(data.email);
            return this._userVerify(user);
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
