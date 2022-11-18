import { Request, Response } from "express";
import getMyUserService from "../services/getMyUserService.js";
import validation from "../middleware/validation.js";

export default async function getMyUser(req: Request, res: Response) {
    try {
        const { id }: any = await validation(req, res);

        const data = await getMyUserService(id);
        res.status(200).send(data);
        return;
    } catch (error: any) {
        res.status(500).send(error.message);
        return;
    }
}
