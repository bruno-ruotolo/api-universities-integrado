import { Router } from "express";
import { getAllUniversities } from "../controllers/universitiesController.js";

const universitiesRoute = Router();

universitiesRoute.get("/universities", getAllUniversities);

export default universitiesRoute;
