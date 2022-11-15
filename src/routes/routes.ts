import {Router} from "express";

import teams from './teamsRoutes'

import users from './usersRoutes'

const router = Router()

router.use(users)
router.use(teams)

export default router