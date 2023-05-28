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
        if(data._id) {
            const user = await this.usersRepository.findById(data._id);
            console.log('user use case', user);
            if (user) {
                const userTokenAlreadExists = await this.usersTokenRepository.TokenExist(user._id);
                console.log('userToken exist', userTokenAlreadExists);
                if (userTokenAlreadExists != (undefined && {})) {
                    console.log('userToken exist', userTokenAlreadExists);
                    if(await this.usersTokenRepository.deleteUserToken(userTokenAlreadExists.token)) {
                        return true;
                    }
                    return false;
                }
                return false;
            }
        }
        if(data.email) {
            const user = await this.usersRepository.findByEmail(data.email);
            if (user) {
                const userTokenAlreadExists = await this.usersTokenRepository.TokenExist(user._id);
                console.log('userToken exist', userTokenAlreadExists);
                if (userTokenAlreadExists != (undefined && {})) {
                    console.log('userToken exist', userTokenAlreadExists);
                    if(await this.usersTokenRepository.deleteUserToken(userTokenAlreadExists.token)) {
                        return true;
                    }
                    return false;
                }
                return false;
            }
        }
        throw new Error('user not exists');
    }
}
