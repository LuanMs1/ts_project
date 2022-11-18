import { Request, Response } from "express";
import getUserByIdService from "../services/getUserByIdService.js";
import validation from "../middleware/validation.js";

export default async function getUserById(req: Request, res: Response) {
    const userId: string = req.params.user_id;

    try {
        const { is_adm, is_leader }: any = await validation(req, res);
        if (!is_adm && !is_leader) {
            throw {
                status: 401,
                message: "Não autorizado!",
            };
        }

        const data = await getUserByIdService(userId);
        if (data.length === 0) {
            throw {
                status: 404,
                message: "Usuário não encontrado!",
            };
        }
        res.status(200).send(data);
        return;
    } catch (error: any) {
        res.status(500).send(error.message);
        return;
    }
}
