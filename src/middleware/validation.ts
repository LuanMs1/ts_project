import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function validation(req: Request, res: Response) {
    const token = req.cookies["token"];

    if (token === undefined) {
        res.status(401).send("Não logado!");
        return;
    }

    const decoded = jwt.decode(token);

    return decoded;
}
