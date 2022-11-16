// nivel para criação de rotas e direcionamento do tratamento
import * as controller from "../controller/index.js";

import {Router} from "express";

const teams = Router();

teams.get("/teams")
teams.get("/teams/:team")

teams.post("/team", controller.registerTeam)
teams.post("/team/:team_id/member/:user_id")

teams.patch("/team/:team_id")

teams.delete("/teams/:team_id")
teams.delete("/team/:team_id/member/:user_id")

export default teams
