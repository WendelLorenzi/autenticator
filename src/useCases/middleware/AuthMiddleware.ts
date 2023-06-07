import { Request } from "express";
import { AuthUseCase } from "./Auth/AuthUseCase";

export class AuthMiddleware {
    constructor(
        private authUseCase: AuthUseCase,
    ) {}

    async handle(request: Request): Promise<boolean> {
        const authorizationHeader = request.headers.authorization;
        const headerToken = authorizationHeader ? authorizationHeader.replace('Bearer ', '') : null;

        try {
            if (typeof headerToken === 'string' && headerToken !== null) {
                const usertoken = await this.authUseCase.execute({
                    token: headerToken
                });
                if (usertoken != undefined) return true;
            }
            return false;
        }
        catch {
            return false;
        }
    }
}