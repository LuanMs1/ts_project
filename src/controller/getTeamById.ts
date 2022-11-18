import { Request, Response } from "express";
import getTeamByIdService from "../services/getTeamByIdService.js";
import validation from "../middleware/validation.js";

export default async function getTeamById(req: Request, res: Response) {
    const teamId: string = req.params.team_id;

    try {
        const data = await getTeamByIdService(teamId);
        if (data.length === 0) {
            throw {
                status: 404,
                message: "Time não encontrado!",
            };
        }
        res.status(200).send(data);
        return;
    } catch (error: any) {
        res.status(500).send(error.message);
        return;
    }
}
