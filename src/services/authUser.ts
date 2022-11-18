import { v4 as uuid } from "uuid";
import * as validator from "../validator/validators.js";
import { registerUser } from "../interfaces/interfaces.js";
import { table, Usuario } from "../interfaces/repositoriesInterfaces.js";
import { Database } from "../repositories/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export default async function login(userData: registerUser) {
    const db = new Database();
    console.log("ENTROU");
    const { email, password } = userData;
    const { err, data } = await db.user.getByEmail(email);

    if (err) throw new Error(err.message);
    if (!data) throw new Error("Usuário não encontrado");
    const user = data as Usuario[];
    // console.log(user);
    // console.log("user_data:", user[0].password);
    // console.log(password);
    const match = await bcrypt.compare(password, user[0].password as string);
    // console.log("compare_bcrypt:", match);

    if (!match) throw new Error("Senha incorreta");
    // console.log(process.env.JWT_SECRET);
    delete user[0].password;
    const token = jwt.sign(user, process.env.JWT_SECRET as string, {
        expiresIn: "1d",
    });
    console.log("token:", token);

    return { token, user };
}
