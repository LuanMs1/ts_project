import { Request, Response } from "express";
import * as validator from "../validator/validators.js";

import { registerTeam } from "../interfaces/interfaces.js";

export default async function registerTeam(req: Request, res: Response) {
    const teamData: registerTeam = req.body;

    try {
        new validator.TeamValidator(teamData.name, "name");
        new validator.LeaderValidator(teamData.leader, "leader");
    } catch (error: any) {
        res.status(400).send(error.message);
        return;
    }

    res.status(200).send(teamData);
}
