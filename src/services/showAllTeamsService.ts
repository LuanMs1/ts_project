import { Database } from "../repositories/index.js";

export default async function showAllTeamsService() {
    try {
        const db = new Database();
        const data = await db.team.getAll();
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
