import { Database } from "../repositories/index.js";

export default async function deleteTeamService(teamId: string) {
    try {
        const db = new Database();
        const data = await db.team.del(teamId);
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
