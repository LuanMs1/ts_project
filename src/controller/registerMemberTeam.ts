import { Request, Response } from "express";
import registerMemberTeamService from "../services/registerMemberTeamService.js";
import validation from "../middleware/validation.js";

export default async function registerMember(req: Request, res: Response) {
    const userIdData: string = req.params.user_id;
    const teamIdData: string = req.params.team_id;

    try {
        const { is_adm, is_leader, squad }: any = await validation(req, res);

        if (is_adm || (is_leader && teamIdData === squad)) {
            await registerMemberTeamService(userIdData, teamIdData);
            res.status(201).send("Time cadastrado com sucesso!");
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
