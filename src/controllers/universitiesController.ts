import { Request, Response } from "express";
import { getAllUniversitiesService } from "../services/universitiesService.js";

export async function getAllUniversities(req: Request, res: Response) {
  const countryQuery = req.query.country as string | string[];
  const universitiesList = await getAllUniversitiesService(countryQuery);
  res.status(200).send(universitiesList);
}
