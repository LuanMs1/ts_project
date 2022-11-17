import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Response, Request, NextFunction} from "express";
import * as dotenv from 'dotenv';
import login from "../services/authUser.js";
dotenv.config();

export interface tokenValidation extends Request {
    token: string | JwtPayload;
}

export const authValidation = (req: tokenValidation, res: Response, next: NextFunction) => {
    
    try{
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ message: "Token não encontrado" });
        }
        const token = authorization.split(" ")[1];

        
        if (!token) return res.status(401).send({ error: 'Access denied' });
     
        const verified = jwt.verify(token, process.env.JWT_SECRET as Secret); 
        req.token = verified;
        next();


    } catch (err) {
        res.status(401).send({ error: 'Access denied' });
    }
}

export default { authValidation};