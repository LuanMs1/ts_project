import { Database } from "../repositories/index.js";

export default async function getTeamByIdService(teamId: string) {
    try {
        const db = new Database();
        const teamData = await db.team.getById(teamId);
        if (teamData.err !== null) {
            throw teamData.err;
        }
        return teamData.data;
    } catch (error: any) {
        throw {
            message: error.message,
        };
    }
}
