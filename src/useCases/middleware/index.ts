import { authUseCase } from "./Auth";
import { AuthMiddleware } from "./AuthMiddleware";

const authMiddleware = new AuthMiddleware(
    authUseCase
)

export { authMiddleware }