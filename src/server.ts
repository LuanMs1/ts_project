import router from "./routes/routes.js";
import express, { json } from "express";
import cors from "cors";

const app = express();

app.use(json());
app.use(cors());
app.use(router);

app.listen(8000, () => console.log("rodando"));
