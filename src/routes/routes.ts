import { Router } from "express";

import teams from "./teamsRoutes.js";

import users from "./usersRoutes.js";

import auth from "./authenticationRoutes.js";

const router = Router();

router.use(users);
router.use(teams);
router.use(auth);

export default router;
