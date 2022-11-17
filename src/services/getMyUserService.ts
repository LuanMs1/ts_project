import { Database } from "../repositories/index.js";

export default async function getMyUserService(myId: string) {
    try {
        const db = new Database();
        const userData = await db.getMyUser(myId);
        if (userData.err !== null) {
            throw userData.err;
        }
        return userData.data;
    } catch (error: any) {
        throw {
            message: error.message,
        };
    }
}
