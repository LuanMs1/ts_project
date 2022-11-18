import { Request, Response } from "express";
import { registerTeam } from "../interfaces/interfaces.js";
import register from "../services/registerTeamService.js";
import validation from "../middleware/validation.js";

export default async function registerTeam(req: Request, res: Response) {
    const teamData: registerTeam = req.body;

    try {
        const { is_adm }: any = validation(req, res);
        if (!is_adm) {
            throw {
                status: 401,
                message: "Não autorizado!",
            };
        }
        await register(teamData);
        res.status(201).send("Time cadastrado com sucesso!");
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}
