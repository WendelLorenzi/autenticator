import { AuthUseCase } from "./AuthUseCase";
import { Request, Response } from "express";

export class AuthController {
    constructor(
        private authUseCase: AuthUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const headerToken = request.headers['x-access-token'];

        try {
            if (typeof headerToken === 'string') {
                const usertoken = await this.authUseCase.execute({
                    token: headerToken
                });
                if (usertoken != undefined) return response.status(200).header("x-access-token", usertoken);
            }
            return response.status(403).send("A token is required for authentication");
        }
        catch {
            return response.status(400).end();
        }
    }
}