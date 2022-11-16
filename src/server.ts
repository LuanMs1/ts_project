import router from "./routes/routes.js";

import express from "express";

const app = express();

app.use(router);

app.listen(8000, () => console.log("rodando"));
