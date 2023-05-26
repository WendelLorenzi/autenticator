import { UsersRepository } from "../../repositories/UsersRepository";
import { UsersTokenRepository } from "../../repositories/UsersTokenRepository";
import { authMiddleware } from "../middleware";
import { RegisterController } from "./RegisterController";
import { RegisterUseCase } from "./RegisterUseCase";

const mongosUsersRepository = new UsersRepository();
const mongosUsersTokenRepository = new UsersTokenRepository();

const registerUseCase = new RegisterUseCase(
  mongosUsersRepository,
  mongosUsersTokenRepository
)

const registerController = new RegisterController(
    registerUseCase,
    authMiddleware
)

export {registerUseCase, registerController }