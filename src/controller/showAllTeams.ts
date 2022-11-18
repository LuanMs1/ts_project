import { Request, Response } from "express";
import showAllTeamsService from "../services/showAllTeamsService";
import validation from "../middleware/validation.js";

export default async function showAllTeams(req: Request, res: Response) {
    try {
        const { is_adm }: any = await validation(req, res);
        if (!is_adm) {
            throw {
                status: 401,
                message: "Não autorizado!",
            };
        }
        const data = await showAllTeamsService();
        res.status(200).send(data);
        return;
    } catch (error: any) {
        res.status(500).send(error.message);
        return;
    }
}
