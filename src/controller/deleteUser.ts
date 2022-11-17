import { Request, Response } from "express";
import deleteUserService from "../services/deleteUserService.js";

export default async function deleteUser(req: Request, res: Response) {
    const userId: string = req.params.user_id;

    try {
        await deleteUserService(userId);
        res.status(200).send("Usuário deletado com sucesso!");
        return;
    } catch (error: any) {
        res.status(500).send(error.message);
        return;
    }
}
