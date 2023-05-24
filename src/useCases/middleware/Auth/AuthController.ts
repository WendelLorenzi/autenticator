import { Request, Response } from "express";
import { AuthUseCase } from "./AuthUseCase";

export class AuthController {
    constructor(
        private authUseCase: AuthUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.body.token || request.query.token || request.headers["x-access-token"]

        try {
            if (token) {
                const usertoken = await this.authUseCase.execute({
                    token
                });
                if (usertoken != undefined) return response.status(200).json(usertoken);
            }
            return response.status(403).send("A token is required for authentication");
        }
        catch {
            return response.status(400).json({
                message: 'Unexpected error'
            });
        }
    }
}