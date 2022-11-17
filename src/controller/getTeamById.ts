import { Request, Response } from "express";
import getTeamByIdService from "../services/getTeamByIdService";

export default async function getTeamById(req: Request, res: Response) {
    const teamId: string = req.params.team_id;

    try {
        const data = await getTeamByIdService(teamId);
        res.status(200).send(data);
        return;
    } catch (error: any) {
        res.status(500).send(error.message);
        return;
    }
}