import { Request, Response } from "express";
import deleteTeamService from "../services/deleteTeamService";
import validation from "../middleware/validation.js";

export default async function deleteTeam(req: Request, res: Response) {
    const teamId: string = req.params.team_id;

    try {
        const { is_adm }: any = await validation(req, res);
        if (!is_adm) {
            throw {
                status: 401,
                message: "Não autorizado!",
            };
        }
        const data = await deleteTeamService(teamId);
        if (data === 0) {
            throw {
                status: 404,
                message: "Time não encontrado!",
            };
        }
        res.status(200).send("Time deletado com sucesso!");
        return;
    } catch (error: any) {
        res.status(error.status || 500).send(error.message);
        return;
    }
}
