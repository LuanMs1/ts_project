import { Request, Response } from "express";
import registerMemberTeamService from "../services/registerMemberTeamService.js";
import validation from "../middleware/validation.js";

export default async function registerMember(req: Request, res: Response) {
    const userIdData: string = req.params.user_id;
    const teamIdData: string = req.params.team_id;

    try {
        const { is_adm }: any = validation(req, res);
        if (!is_adm) {
            throw {
                status: 401,
                message: "Não autorizado!",
            };
        }
        await registerMemberTeamService(userIdData, teamIdData);
        res.status(201).send("Time cadastrado com sucesso!");
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}
