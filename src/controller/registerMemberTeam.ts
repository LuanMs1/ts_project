import { Request, Response } from "express";
import registerMemberTeamService from "../services/registerMemberTeamService.js";

export default async function registerMember(req: Request, res: Response) {
    const userIdData: string = req.params.user_id;
    const teamIdData: string = req.params.team_id;


    try {
        await registerMemberTeamService(userIdData,teamIdData);
        res.status(201).send("Time cadastrado com sucesso!");
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}