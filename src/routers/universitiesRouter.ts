import { Router } from "express";
import {
  getAllUniversities,
  getUniversity,
} from "../controllers/universitiesController.js";

const universitiesRoute = Router();

universitiesRoute.get("/universities", getAllUniversities);
universitiesRoute.get("/universities/:id", getUniversity);

export default universitiesRoute;
