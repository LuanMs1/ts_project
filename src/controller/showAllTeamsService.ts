import { Request, Response } from "express";
import showAllTeamsService from "../services/showAllTeamsService";

export default async function showAllTeams(req: Request, res: Response) {
    try {
        const data = await showAllTeamsService();
        res.status(200).send(data);
        return;
    } catch (error: any) {
        res.status(500).send(error.message);
        return;
    }
}
