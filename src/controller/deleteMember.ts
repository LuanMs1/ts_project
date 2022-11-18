import { Request, Response } from "express";
import deleteMemberService from "../services/deleteMemberTeamService";
import validation from "../middleware/validation.js";

export default async function deleteMember(req: Request, res: Response) {
    const memberId: string = req.params.user_id;
    const teamId: string = req.params.team_id;

    try {
        const { is_adm, is_leader, squad }: any = await validation(req, res);

        if (is_adm || (is_leader && teamId === squad)) {
            const data = await deleteMemberService(memberId);
            if (data === 0) {
                throw {
                    status: 404,
                    message: "Membro não encontrado nessa equipe!",
                };
            }
            res.status(200).send("Membro deletado com sucesso!");
            return;
        } else {
            throw {
                status: 401,
                message: "Não autorizado!",
            };
        }
    } catch (error: any) {
        res.status(error.status || 500).send(error.message);
        return;
    }
}
