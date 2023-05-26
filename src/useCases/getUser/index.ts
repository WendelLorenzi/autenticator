import { UsersRepository } from "../../repositories/UsersRepository";
import { authMiddleware } from "../middleware";
import { getUserController } from "./getUserController";
import { GetUserUseCase } from "./getUserUseCase";

const mongosUsersRepository = new UsersRepository();

const getUserUseCase = new GetUserUseCase(
  mongosUsersRepository,
)

const getuserController = new getUserController(
    getUserUseCase,
    authMiddleware
)

export { getUserUseCase, getuserController }