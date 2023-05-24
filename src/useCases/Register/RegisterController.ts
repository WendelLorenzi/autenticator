import { Request, Response } from "express";
import { RegisterUseCase } from "./RegisterUseCase";

export class RegisterController {
    constructor(
        private registerUseCase: RegisterUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        try {
            const token = await this.registerUseCase.execute({
                name,
                email,
                password
            });
            if (token) return response.status(200).json({ "acessToken": token });
            return response.status(200).send();
        }
        catch {
            return response.status(400).json({
                message: 'Unexpected error'
            })
        }
    }
}