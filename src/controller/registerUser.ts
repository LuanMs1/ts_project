import { Request, Response } from "express";
import * as validator from "../validator/validators.js";

import { registerUser } from "../interfaces/interfaces.js";

export default async function registerUser(req: Request, res: Response) {
    const userData: registerUser = req.body;

    try {
        new validator.StringValidator(userData.username, "Username");
        new validator.EmailValidator(userData.email);
        new validator.PasswordValidator(userData.password);
        new validator.StringValidator(userData.first_name, "first_name");
        new validator.StringValidator(userData.last_name, "last_name");
        new validator.BooleanValidator(userData.is_admin);
    } catch (error: any) {
        res.status(400).send(error.message);
        return;
    }

    res.status(200).send(userData);
}
