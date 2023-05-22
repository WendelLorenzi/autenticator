import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository";
import { RegisterRequestDTO } from "./ResgisteDTO";

export class RegisterUseCase {
    constructor(
        private usersRepository: IUsersRepository,
    ) {}
    async execute(
        data: RegisterRequestDTO
    ) {
        // const userAlreadExists = await this.usersRepository.findByEmail(data.email);
        // if (userAlreadExists) {
        //     throw new Error('User alread exists');
        // }
        const user = new User(data);
        await this.usersRepository.create(user);
    }
}