import { v4 as uuid } from "uuid";
import * as validator from "../validator/validators.js";
import { registerTeam } from "../interfaces/interfaces.js";
import { Database } from "../repositories/index.js";

export default async function register(teamData: registerTeam) {
    try {
        new validator.TeamValidator(teamData.name, "name");
        new validator.LeaderValidator(teamData.leader, "leader");

        const id = uuid();
        teamData.id = id;

        // const db = new Database();
        // const data = await db.postTeam(teamData);
        // if(data.err !== null) {
        //     throw {
        //         status: 500,
        //         message: "Erro no banco de dados!",
        //     };
        // }
        return;
    } catch (error: any) {
        throw {
            status: error.status || 500,
            message: error.message,
        };
    }
}