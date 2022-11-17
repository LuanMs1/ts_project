import { Request, Response } from "express";
import getMyUserService from "../services/getMyUserService.js";

export default async function getMyUser(req: Request, res: Response) {
    const myId: string = "123";

    try {
        const data = await getMyUserService(myId);
        res.status(200).send(data);
        return;
    } catch (error: any) {
        res.status(500).send(error.message);
        return;
    }
}
