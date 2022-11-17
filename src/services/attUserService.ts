import { Database } from "../repositories/index.js";
import { attUser } from "../interfaces/interfaces.js";
import * as validator from "../validator/validators.js";

export default async function attUserService(
    userId: string,
    userData: attUser
) {
    try {
        if (userData.username !== undefined) {
            new validator.StringValidator(userData.username, "Username");
        }
        if (userData.password !== undefined) {
            new validator.PasswordValidator(userData.password);
        }
        if (userData.first_name !== undefined) {
            new validator.StringValidator(userData.first_name, "first_name");
        }
        if (userData.last_name !== undefined) {
            new validator.StringValidator(userData.last_name, "last_name");
        }
        if (userData.is_admin !== undefined) {
            new validator.BooleanValidator(userData.is_admin);
        }

        userData.id = userId;

        const db = new Database();
        const data = await db.updateUser(userData);
        if (data.err !== null) {
            throw {
                status: 500,
                message: data.err.message,
            };
        }
    } catch (error: any) {
        throw {
            status: error.status || 500,
            message: error.message,
        };
    }
}
