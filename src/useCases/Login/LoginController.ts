import { Request, Response } from "express";
import { UserToken } from "../../entities/UserToken";
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
            const send = new UserToken({ user: usertoken?.user, token: usertoken?.token });
            return response.json(send);
        }
        catch {
            return response.status(400).json({
                message: 'Unexpected error'
            });
        }
    }
}