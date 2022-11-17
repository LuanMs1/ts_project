import { Request, Response } from "express";
import getUserByIdService from "../services/getUserByIdService.js";

export default async function getUserById(req: Request, res: Response) {
    const userId: string = req.params.user_id;

    try {
        const data = await getUserByIdService(userId);
        res.status(200).send(data);
        return;
    } catch (error: any) {
        res.status(500).send(error.message);
        return;
    }
}
