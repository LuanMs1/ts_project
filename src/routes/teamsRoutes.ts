// nivel para criação de rotas e direcionamento do tratamento
import * as controller from "../controller/index.js";

import {Router} from "express";

const teams = Router();

teams.get("/teams", controller.showAllTeams)
teams.get("/teams/:team", controller.getTeamById)

teams.post("/team", controller.registerTeam)
teams.post("/team/:team_id/member/:user_id", controller.registerMember)

teams.patch("/team/:team_id", controller.attTeam)

teams.delete("/teams/:team_id", controller.deleteTeam)
teams.delete("/team/:team_id/member/:user_id", controller.deleteMember)

export default teams
