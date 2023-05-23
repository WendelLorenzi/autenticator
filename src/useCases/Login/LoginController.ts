import { Request, Response } from "express";
import { LoginUseCase } from "./LoginUseCase";

export class LoginController {
    constructor(
        private loginUseCase: LoginUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        try {
            const usertoken = await this.loginUseCase.execute({
                email,
                password
            });
            if (typeof usertoken != 'string' && usertoken != undefined) {
                return response.json({ "acessToken": usertoken?.token });
            }
            return response.status(400).json({
                message: 'Password not match'
            });
        }
        catch {
            return response.status(400).json({
                message: 'Unexpected error'
            });
        }
    }
}