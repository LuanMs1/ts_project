import { Request, Response } from "express";
import showAllUsersService from "../services/showAllUsersService.js";

export default async function showAllUsers(req: Request, res: Response) {
    try {
        const data = await showAllUsersService();
        res.status(200).send(data);
        return;
    } catch (error: any) {
        res.status(500).send(error.message);
        return;
    }
}
