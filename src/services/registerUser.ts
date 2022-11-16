import { v4 as uuid } from "uuid";
import * as validator from "../validator/validators.js";
import { registerUser } from "../interfaces/interfaces.js";
import { Database } from "../repositories/index.js";

export default function register(userData: registerUser) {
    try {
        new validator.StringValidator(userData.username, "Username");
        new validator.EmailValidator(userData.email);
        new validator.PasswordValidator(userData.password);
        new validator.StringValidator(userData.first_name, "first_name");
        new validator.StringValidator(userData.last_name, "last_name");
        new validator.BooleanValidator(userData.is_admin);

        const id = uuid();
        userData.id = id;

        // const data = new Database.postUser(userData);
        // if(data.err !== null) {
        //     throw {
        //         status: 500,
        //         message: "Erro no banco de dados!",
        //     };
        // }
    } catch (error: any) {
        throw {
            status: error.status,
            message: error.message,
        };
    }
}