import { Request, Response } from "express";
import deleteMemberService from "../services/deleteMemberTeamService";
import validation from "../middleware/validation.js";

export default async function deleteMember(req: Request, res: Response) {
    const memberId: string = req.params.user_id;

    try {
        const { is_adm }: any = validation(req, res);
        if (!is_adm) {
            throw {
                status: 401,
                message: "Não autorizado!",
            };
        }
        const data = await deleteMemberService(memberId);
        if (data === 0) {
            throw {
                status: 404,
                message: "Membro não encontrado nessa equipe!",
            };
        }
        res.status(200).send("Membro deletado com sucesso!");
        return;
    } catch (error: any) {
        res.status(error.status || 500).send(error.message);
        return;
    }
}
