import { UsersRepository } from "../../repositories/UsersRepository";
import { RegisterController } from "./RegisterController";
import { RegisterUseCase } from "./RegisterUseCase";

const mongosUsersRepository = new UsersRepository();

const registerUseCase = new RegisterUseCase(
  mongosUsersRepository
)

const registerController = new RegisterController(
    registerUseCase
)

export {registerUseCase, registerController }