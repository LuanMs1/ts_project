import { Request, Response } from "express";
import attTeamService from "../services/attTeamService.js";
import { attUser } from "../interfaces/interfaces.js";

export default async function attTeam(req: Request, res: Response) {
    const teamId: string = req.params.team_id;
    const teamData: attUser = req.body;

    try {
        const data = await attTeamService(teamId, teamData);
        if (data === 0) {
            throw {
                status: 404,
                message: "Time não encontrado!",
            };
        }
        res.status(200).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}
