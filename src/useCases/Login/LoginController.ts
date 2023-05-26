import { Request, Response } from "express";
import { LoginUseCase } from "./LoginUseCase";

export class LoginController {
    constructor(
        private loginUseCase: LoginUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body; 
            try {
                if (email && password) {
                    const usertoken = await this.loginUseCase.execute({
                        email,
                        password
                    });
                    if (typeof usertoken != 'string' && usertoken != undefined) {                   
                        return response.status(200).header("x-access-token", usertoken.token).send();
                    }
                    return response.status(401).end();
                }
                return response.status(400).end();
            }
            catch {
                return response.status(400).json({
                    message: 'Unexpected error'
                });
        }
    }
}