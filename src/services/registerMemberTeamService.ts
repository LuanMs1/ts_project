import { Database } from "../repositories/index.js";

export default async function registerMemberTeamService(memberData: string, teamData : string) {
    try {
        const db = new Database();
        const data = await db.team.postMember(teamData,memberData);
        if(data.err !== null) {
            throw data.err
        }
        return;
    } catch (error: any) {
        throw {
            message: error.message,
        };
    }
}
