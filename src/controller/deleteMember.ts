import { Request, Response } from "express";
import deleteMemberService from "../services/deleteMemberTeamService";

export default async function deleteMember(req: Request, res: Response) {
    const memberId: string = req.params.member_id;

    try {
        await deleteMemberService(memberId);
        res.status(200).send("Membro deletado com sucesso!");
        return;
    } catch (error: any) {
        res.status(500).send(error.message);
        return;
    }
}