import { Database } from "../repositories/index.js";
import { attTeam } from "../interfaces/interfaces.js";
import * as validator from "../validator/validators.js";

export default async function attTeamService(
    teamId: string,
    teamData: attTeam
) {
    try {
        if (teamData.name !== undefined) {
            new validator.TeamValidator(teamData.name, "Team Name");
        }
        if (teamData.leader !== undefined) {
            new validator.LeaderValidator(teamData.leader, "Leader");
        }

        teamData.id = teamId;

        const db = new Database();
        const data = await db.team.update(teamData, teamId);
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
