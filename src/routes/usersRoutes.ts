import * as controller from "../controller/index.js";

import { Router } from "express";

const users = Router();

users.get("/users", controller.showAllUsers);
users.get("/users/me", controller.getMyUser);
users.get("/users/:user_id", controller.getUserById);

users.post("/users", controller.registerUser);

users.patch("/users/:user_id", controller.attUser);

users.delete("/users/:user_id", controller.deleteUser);

export default users;
