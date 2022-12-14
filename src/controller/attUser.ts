import { Request, Response } from "express";
import attUserService from "../services/attUserService.js";
import { attUser } from "../interfaces/interfaces.js";
import validation from "../middleware/validation.js";

export default async function attUser(req: Request, res: Response) {
    const userId: string = req.params.user_id;
    const userData: attUser = req.body;

    try {
        const { id }: any = await validation(req, res);
        if (id !== userId) {
            throw {
                status: 401,
                message: "Não autorizado!",
            };
        }

        const data = await attUserService(userId, userData);
        if (data === 0) {
            throw {
                status: 404,
                message: "Usuário não encontrado!",
            };
        }
        res.status(200).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}
