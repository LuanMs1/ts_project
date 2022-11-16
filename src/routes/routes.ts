import { Router } from "express";

import teams from "./teamsRoutes.js";

import users from "./usersRoutes.js";

const router = Router();

router.use(users);
router.use(teams);

export default router;
