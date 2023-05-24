import { UsersRepository } from "../../repositories/UsersRepository";
import { getUserController } from "./getUserController";
import { GetUserUseCase } from "./getUserUseCase";

const mongosUsersRepository = new UsersRepository();

const getUserUseCase = new GetUserUseCase(
  mongosUsersRepository,
)

const getuserController = new getUserController(
    getUserUseCase
)

export { getUserUseCase, getuserController }