import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Database } from "../repositories/index.js";

export default async function validation(req: Request, res: Response) {
    const token = req.cookies["token"];

    if (token === undefined) {
        throw res.status(401).send("Não logado!");
    }

    const decoded: any = jwt.decode(token);

    if (decoded.squad === null) {
        return decoded;
    }

    const db = new Database();
    const team = await db.team.getById(decoded.squad);
    if (team.err !== null) {
        throw res.status(500).send(team.err.message);
    }

    if (decoded.id === team.data[0].leader) {
        decoded.is_leader = true;
    } else {
        decoded.is_leader = false;
    }

    return decoded;
}
