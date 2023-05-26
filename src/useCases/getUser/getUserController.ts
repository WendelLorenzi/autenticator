import { Request, Response } from "express";
import { GetUserUseCase } from "./getUserUseCase";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export class getUserController {
    constructor(
        private getuserUseCase: GetUserUseCase,
        private authmiddleware: AuthMiddleware,
    ) {}

    async handle(request: Request, response: Response): Promise<Response | undefined> {
        const { _id, email } = request.body;
        const auth = await this.authmiddleware.handle(request);

        try {
            if (auth) {
                const user = await this.getuserUseCase.execute({
                    _id,
                    email,
                });
                if (user) {
                    return response.status(200).json(user);
                }
                return response.status(400).send();
            }
        } catch {
            return response.status(400).json({
                message: 'Unexpected error'
            })
        }
    }
}