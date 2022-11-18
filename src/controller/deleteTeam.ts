import { Request, Response } from "express";
import deleteTeamService from "../services/deleteTeamService";

export default async function deleteTeam(req: Request, res: Response) {
    const teamId: string = req.params.team_id;

    try {
        const data = await deleteTeamService(teamId);
        if (data === 0) {
            throw {
                status: 404,
                message: "Time não encontrado!",
            };
        }
        res.status(200).send("Time deletado com sucesso!");
        return;
    } catch (error: any) {
        res.status(error.status || 500).send(error.message);
        return;
    }
}
