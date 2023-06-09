import { UserEntitie } from "../../entities/User";
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
                return new UserEntitie({ _id: user._id, email: user.email, name: user.name });
            }
            throw new Error('find user error');
        }
        if (data.email) {
            const user = await this.usersRepository.findByEmail(data.email);
            if (user) {
                return new UserEntitie({ _id: user._id, email: user.email, name: user.name });
            }
            throw new Error('find user error');
        }
        throw new Error('user not exists');
    }
}