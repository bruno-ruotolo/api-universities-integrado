import express, { json } from "express";
import "express-async-errors";
import cors from "cors";

import { handleErrors } from "./middlewares/handleErrorMiddleware.js";
import mainRouter from "./routers/index.js";

const app = express();
app.use(json());
app.use(cors());

app.use(mainRouter);
app.use(handleErrors);

export default app;
