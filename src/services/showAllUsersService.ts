import { Database } from "../repositories/index.js";

export default async function showAllUsersService() {
    try {
        const db = new Database();
        const data = await db.user.getAll();
        if (data.err !== null) {
            throw data.err;
        }
        return data.data;
    } catch (error: any) {
        throw {
            message: error.message,
        };
    }
}
