import { Request, response, Response } from "express";
import showAllUsersService from "../services/showAllUsersService.js";
import validation from "../middleware/validation.js";
import { request } from "http";

export default async function showAllUsers(req: Request, res: Response) {
    try {
        const { is_adm }: any = validation(req, res);
        if (!is_adm) {
            throw {
                status: 401,
                message: "Não autorizado!",
            };
        }

        const data = await showAllUsersService();
        res.status(200).send(data);
        return;
    } catch (error: any) {
        res.status(error.status || 500).send(error.message);
        return;
    }
}
