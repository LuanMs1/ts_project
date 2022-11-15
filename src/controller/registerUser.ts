import { json, Request, Response } from "express";

import { registerUser }  from "../interfaces/interfaces";

export default async function registeUser(req: Request, res:Response) {

    const userData : any = JSON.stringify(req.body)
    console.log(userData);
    console.log(req.body);
    
    res.status(200).send();
}
