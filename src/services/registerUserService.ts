import { v4 as uuid } from "uuid";
import * as validator from "../validator/validators.js";
import { registerUser } from "../interfaces/interfaces.js";
import { Database } from "../repositories/index.js";
import bcrypt from "bcrypt"; 

export default async function register(userData: registerUser) {
    try {
        new validator.StringValidator(userData.username, "Username");
        new validator.EmailValidator(userData.email);
        new validator.PasswordValidator(userData.password);
        new validator.StringValidator(userData.first_name, "first_name");
        new validator.StringValidator(userData.last_name, "last_name");
        new validator.BooleanValidator(userData.is_adm);

        const id = uuid();
        userData.id = id;

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        
        const db = new Database();
        const data = await db.user.post(userData);
        if (data.err !== null) {
            throw {
                status: 500,
                message: data.err.message,
            };
        }
        return;
    } catch (error: any) {
        throw {
            status: error.status || 500,
            message: error.message,
        };
    }
}
