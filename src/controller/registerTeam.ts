import { Request, Response } from "express";
import { registerTeam } from "../interfaces/interfaces.js";
import register from "../services/registerTeam.js";

export default function registerTeam(req: Request, res: Response) {
    const teamData: registerTeam = req.body;

    try {
        register(teamData);
        res.status(202).send("Time cadastrado com sucesso!");
        return
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }

}
