import { v4 as uuid } from "uuid";
import * as validator from "../validator/validators.js";
import { registerTeam } from "../interfaces/interfaces.js";
import { Database } from "../repositories/index.js";

export default function register(teamData: registerTeam) {
    try {
        new validator.TeamValidator(teamData.name, "name");
        new validator.LeaderValidator(teamData.leader, "leader");

        const id = uuid();
        teamData.id = id;

        // const data = new Database.postTeam(teamData);
        // if(data.err !== null) {
        //     throw {
        //         status: 500,
        //         message: "Erro no banco de dados!",
        //     };
        // }
    } catch (error: any) {
        throw {
            status: error.status,
            message: error.message,
        };
    }
}
