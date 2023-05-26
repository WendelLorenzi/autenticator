import { UsersRepository } from "../../repositories/UsersRepository";
import { UsersTokenRepository } from "../../repositories/UsersTokenRepository";
import { authMiddleware } from "../middleware";
import { LogoutController } from "./LogoutController";
import { LogoutUseCase } from "./LogoutUseCase";

const mongosUsersRepository = new UsersRepository();
const mongosUsersTokenRepository = new UsersTokenRepository();

const logoutUseCase = new LogoutUseCase(
  mongosUsersRepository,
  mongosUsersTokenRepository
)

const logoutController = new LogoutController(
    logoutUseCase,
    authMiddleware
)

export { logoutUseCase, logoutController }