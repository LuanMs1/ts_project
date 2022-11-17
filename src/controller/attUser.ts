import { Request, Response } from "express";
import attUserService from "../services/attUserService.js";
import { attUser } from "../interfaces/interfaces.js";

export default async function attUser(req: Request, res: Response) {
    const userId: string = req.params.user_id;
    const userData: attUser = req.body;

    try {
        const data = await attUserService(userId, userData);
        res.status(200).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}
