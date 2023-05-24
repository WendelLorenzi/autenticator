import { Request, Response } from "express";
import { GetUserUseCase } from "./getUserUseCase";

export class getUserController {
    constructor(
        private getuserUseCase: GetUserUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { _id, email } = request.body;

        try {
            const user = await this.getuserUseCase.execute({
                _id,
                email,
            });
            if (user) {
                return response.status(200).json(user);
            }
            return response.status(400).send();
        }
        catch {
            return response.status(400).json({
                message: 'Unexpected error'
            })
        }
    }
}