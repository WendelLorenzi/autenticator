import { Request, Response } from "express";
import { LogoutUseCase } from "./LogoutUseCase";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export class LogoutController {
    constructor(
        private logoutUseCase: LogoutUseCase,
        private authmiddleware: AuthMiddleware
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { _id } = request.body;
        const auth = await this.authmiddleware.handle(request);

        console.log('_id', _id);

        try {
            if (auth) {
                const del = await this.logoutUseCase.execute({
                    _id,
                });
                if (del) return response.status(200).end();
                return response.status(400).send();
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