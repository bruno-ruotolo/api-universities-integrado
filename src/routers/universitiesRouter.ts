import { Router } from "express";
import {
  createUniversity,
  deleteUniversity,
  getAllUniversities,
  getUniversity,
  updateUniversity,
} from "../controllers/universitiesController.js";
import { schemaValidator } from "../middlewares/schemaValidatorMiddleware.js";
import universitySchema from "../schemas/universitiesSchema.js";
import createUniversitySchema from "../schemas/universitiesSchema.js";

const universitiesRoute = Router();

universitiesRoute.get("/universities", getAllUniversities);
universitiesRoute.get("/universities/:id", getUniversity);

universitiesRoute.post(
  "/universities",
  schemaValidator(universitySchema.createUniversitySchema),
  createUniversity
);

universitiesRoute.put(
  "/universities/:id",
  schemaValidator(universitySchema.updateUniversitySchema),
  updateUniversity
);

universitiesRoute.delete("/universities/:id", deleteUniversity);

export default universitiesRoute;
