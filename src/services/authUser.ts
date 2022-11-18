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
    try {
        const db = new Database();
        console.log("ENTROU");
        const { email, password } = userData;
        const { err, data } = await db.user.getByEmail(email);

        if (err) throw { status: 500, message: err.message };
        if (!data) throw { status: 404, message: "Usuário não encontrado" };
        const user = data as Usuario[];
        console.log(user);

        // console.log(user);
        // console.log("user_data:", user[0].password);
        // console.log(password);
        const match = await bcrypt.compare(
            password,
            user[0].password as string
        );
        // console.log("compare_bcrypt:", match);

        if (!match) throw { status: 401, message: "Senha incorreta" };
        // console.log(process.env.JWT_SECRET);
        delete user[0].password;
        const token = jwt.sign(user[0], process.env.JWT_SECRET as string, {
            expiresIn: "1d",
        });
        console.log("token:", token);

        return { token, user };
    } catch (error: any) {
        throw error;
    }
}
