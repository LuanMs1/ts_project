import { Request, Response } from "express";
import deleteUserService from "../services/deleteUserService.js";
import validation from "../middleware/validation.js";

export default async function deleteUser(req: Request, res: Response) {
    const userId: string = req.params.user_id;

    try {
        const { is_adm }: any = validation(req, res);
        if (!is_adm) {
            throw {
                status: 401,
                message: "Não autorizado!",
            };
        }
        const data = await deleteUserService(userId);
        if (data === 0) {
            throw {
                status: 404,
                message: "Usuário não encontrado!",
            };
        }
        res.status(200).send("Usuário deletado com sucesso!");
        return;
    } catch (error: any) {
        res.status(error.status || 500).send(error.message);
        return;
    }
}
