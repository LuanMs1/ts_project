import { Request, Response } from "express";
import { registerUser } from "../interfaces/interfaces.js";
import register from "../services/registerUserService.js";

export default async function registerUser(req: Request, res: Response) {
    const userData: registerUser = req.body;

    try {
        await register(userData);
        res.status(201).send("Cadastrado com sucesso!");
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}
