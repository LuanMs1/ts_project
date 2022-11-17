import { v4 as uuid } from "uuid";
import * as validator from "../validator/validators.js";
import { registerUser } from "../interfaces/interfaces.js";
import { Database } from "../repositories/index.js";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

export default async function login(userData: registerUser) {
    const db = new Database();
    const { username, password } = userData;
    const { err, data } = await db.getUsername(username);
    
    if (err) throw new Error(err.message);
    if (!data) throw new Error("Usuário não encontrado");
    const user = data[0];
    console.log('user_data:', user.password);
    
    const match = await bcrypt.compare(password, user.password as string);
    console.log('compare_bcrypt:', match);
    
    if (!match) throw new Error("Senha incorreta");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: "1d",
    });
    console.log('token:', token);
    
    return { token, user };
}
