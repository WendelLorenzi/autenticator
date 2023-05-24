import { UserToken } from "../../entities/UserToken";
import { JWTservice } from "../../providers/services";
import PasswordEncryptor from "../../providers/services/PasswordEncryptor";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/interfaces/IUsersTokenReposytory";
import { LoginRequestDTO } from "./LoginDTO";

export class LoginUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private usersTokenRepository: IUsersTokenRepository,
    ) {}
    async execute(
        data: LoginRequestDTO
    ) {
            const user = await this.usersRepository.findByEmail(data.email);
            if (user) {
                const mathPass = await PasswordEncryptor.comparePasswords(data.password, user.password);
                if (mathPass) {
                    const userTokenAlreadExists = await this.usersTokenRepository.TokenExist(user);
                    if (userTokenAlreadExists != (undefined && {})) {
                        if (!JWTservice.JWTVerifier(userTokenAlreadExists.token)) {
                            userTokenAlreadExists.token = JWTservice.sign({ uid: userTokenAlreadExists.user._id });
                            await this.usersTokenRepository.updateToken(user, userTokenAlreadExists.token);
                            return userTokenAlreadExists;
                        }
                        return userTokenAlreadExists;
                    }
                    const token = JWTservice.sign({ uid: user._id });
                    await this.usersTokenRepository.create({ user, token });
                    return new UserToken({ user, token });
                }
                throw 'Password not match';
            }
    }
}