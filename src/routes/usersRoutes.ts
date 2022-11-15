import {Router} from "express";

const users = Router();

// GET “/users/me” - Ver seu próprio usuário (Todos)
// • GET “/users/” - Ver todos os usuários (Admin)
// • GET “/users/:user_id” - Ver determinado usuário (Admin, Líder)

users.get("/users")
users.get("/users/me")
users.get("/users/:user_id")

users.post("/users")

users.patch("/users/:user_id")

users.delete("/users/:user_id")

export default users
