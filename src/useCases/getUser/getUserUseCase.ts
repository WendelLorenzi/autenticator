import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository";
import { GetUserRequestDTO } from "./getUserDTO";

export class GetUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
    ) {}
    async execute(
        data: GetUserRequestDTO
    ) {
        if (data._id) {
            const user = await this.usersRepository.findById(data._id);
            if (user) {
                const userReturn = JSON.parse(JSON.stringify({ _id: user._id, email: user.email, name: user.name }));
                return userReturn;
            }
            throw new Error('find user error');
        }
        if (data.email) {
            const user = await this.usersRepository.findByEmail(data.email);
            if (user) {
                const userReturn = JSON.parse(JSON.stringify({ _id: user._id, email: user.email, name: user.name }));
                return userReturn;
            }
            throw new Error('find user error');
        }
        throw new Error('user not exists');
    }
}