import { v4 as uuidv4 } from 'uuid';
import { User } from "../../entities/User";
import { JWTservice } from "../../providers/services";
import PasswordEncryptor from "../../providers/services/PasswordEncryptor";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/interfaces/IUsersTokenReposytory";
import { RegisterRequestDTO } from "./ResgisteDTO";

export class RegisterUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private usersTokenRepository: IUsersTokenRepository,
    ) {}
    async execute(
        data: RegisterRequestDTO
    ) {
        const userAlreadExists = await this.usersRepository.UserAlreadExists(data.email);
        if (userAlreadExists) {
            throw new Error('User alread exists');
        }
        await PasswordEncryptor.hashPassword(data.password).then(hash => {
            data.password = hash;
        });
        const userId = uuidv4();
        const user = new User({ name: data.name, email: data.email, password: data.password }, userId);
        if ((user._id) != undefined) {
            const token = JWTservice.sign({ uid: user._id });
            if (token != 'JWT_SECRET_NOT_FOUND' &&'JWT_SECRET_NOT_FOUND') {
                const userToken = {
                    userId: user._id,
                    token
                };
                await this.usersTokenRepository.create(userToken);
                await this.usersRepository.create(user);
                return userToken.token;
            }
        }
    }
}