import { Request, Response } from "express";
import { LogoutUseCase } from "./LogoutUseCase";

export class LogoutController {
    constructor(
        private logoutUseCase: LogoutUseCase,
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { _id, email } = request.body;
        console.log('_id, email', _id, email);

        try {
            const del = await this.logoutUseCase.execute({
                _id,
                email,
            });
            console.log('del', del);
            if (del) return response.status(200).end();
            return response.status(400).send();
        }
        catch {
            return response.status(400).json({
                message: 'Unexpected error'
            })
        }
    }
}