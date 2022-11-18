import { Request, Response } from "express";
import deleteMemberService from "../services/deleteMemberTeamService";

export default async function deleteMember(req: Request, res: Response) {
    const memberId: string = req.params.user_id;

    try {
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
