import { UsersRepository } from "../../repositories/UsersRepository";
import { UsersTokenRepository } from "../../repositories/UsersTokenRepository";
import { LoginController } from "./LoginController";
import { LoginUseCase } from "./LoginUseCase";

const mongosUsersRepository = new UsersRepository();
const mongosUsersTokenRepository = new UsersTokenRepository();

const loginUseCase = new LoginUseCase(
  mongosUsersRepository,
  mongosUsersTokenRepository
)

const loginController = new LoginController(
    loginUseCase
)

export { loginUseCase, loginController }