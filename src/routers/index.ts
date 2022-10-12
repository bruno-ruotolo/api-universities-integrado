import { Router } from "express";
import universitiesRoute from "./universitiesRouter.js";

const mainRouter = Router();

mainRouter.use(universitiesRoute);

export default mainRouter;
