import { ResendMailProvider } from "../../providers/ResendMail/MailProvider";
import { UsersRepository } from "../../repositories/UsersRepository";
import { UsersTokenRepository } from "../../repositories/UsersTokenRepository";
import { authMiddleware } from "../middleware";
import { RegisterController } from "./RegisterController";
import { RegisterUseCase } from "./RegisterUseCase";

const mongosUsersRepository = new UsersRepository();
const mongosUsersTokenRepository = new UsersTokenRepository();
const mailprovider = new ResendMailProvider();

const registerUseCase = new RegisterUseCase(
  mongosUsersRepository,
  mongosUsersTokenRepository,
  mailprovider
)

const registerController = new RegisterController(
    registerUseCase,
    authMiddleware
)

export {registerUseCase, registerController }