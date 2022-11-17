import { Database } from "../repositories/index.js";

export default async function deleteUserService(userId: string) {
    try {
        const db = new Database();
        const data = await db.deleteUser(userId);
        if (data.err !== null) {
            throw data.err;
        }
        return;
    } catch (error: any) {
        throw {
            message: error.message,
        };
    }
}
