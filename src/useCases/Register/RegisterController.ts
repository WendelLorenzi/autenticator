import { Request, Response } from "express";
import { RegisterUseCase } from "./RegisterUseCase";

export class RegisterController {
    constructor(
        private registerUseCase: RegisterUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        try {
            await this.registerUseCase.execute({
                name,
                email,
                password
            });
            return response.status(200).send();
        }
        catch {
            return response.status(400).json({
                message: 'Unexpected error'
            })
        }
    }
}