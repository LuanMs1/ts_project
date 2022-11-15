import registerUser from "../controller/registerUser";

import { Router } from "express";

const users = Router();

users.get("/users");
users.get("/users/me");
users.get("/users/:user_id");

users.post("/users", registerUser);

users.patch("/users/:user_id");

users.delete("/users/:user_id");

export default users;
