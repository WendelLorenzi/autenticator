import { UsersTokenRepository } from "../../../repositories/UsersTokenRepository";
import { AuthController } from "./AuthController";
import { AuthUseCase } from "./AuthUseCase";

const mongosUsersTokenRepository = new UsersTokenRepository();

const authUseCase = new AuthUseCase(
  mongosUsersTokenRepository
)

const authController = new AuthController(
    authUseCase
)

export { authUseCase, authController }