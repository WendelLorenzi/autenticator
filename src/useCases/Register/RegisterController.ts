import { Request, Response } from "express";
import { RegisterUseCase } from "./RegisterUseCase";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export class RegisterController {
    constructor(
        private registerUseCase: RegisterUseCase,
        private authmiddleware: AuthMiddleware
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;
        const auth = await this.authmiddleware.handle(request);

        try {
            if (auth) {
                const token = await this.registerUseCase.execute({
                    name,
                    email,
                    password
                });
                if (token) return response.status(200).header("x-auth-token", token).send();
                return response.status(400).end();
            }
            return response.status(401).end();
        }
        catch {
            return response.status(400).json({
                message: 'Unexpected error'
            })
        }
    }
}