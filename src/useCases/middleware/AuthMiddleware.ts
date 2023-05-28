import { Request } from "express";
import { AuthUseCase } from "./Auth/AuthUseCase";

export class AuthMiddleware {
    constructor(
        private authUseCase: AuthUseCase,
    ) {}

    async handle(request: Request): Promise<boolean> {
        const headerToken = request.headers['x-auth-token'];

        try {
            if (typeof headerToken === 'string') {
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