import { Request, Response } from "express";
import attTeamService from "../services/attTeamService.js";
import { attUser } from "../interfaces/interfaces.js";
import validation from "../middleware/validation.js";

export default async function attTeam(req: Request, res: Response) {
    const teamId: string = req.params.team_id;
    const teamData: attUser = req.body;

    try {
        const { is_adm, is_leader, squad }: any = await validation(req, res);

        if (is_adm || (is_leader && teamId === squad)) {
            const data = await attTeamService(teamId, teamData);
            if (data === 0) {
                throw {
                    status: 404,
                    message: "Time não encontrado!",
                };
            }
            res.status(200).send(data);
            return;
        } else {
            throw {
                status: 401,
                message: "Não autorizado!",
            };
        }
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}
