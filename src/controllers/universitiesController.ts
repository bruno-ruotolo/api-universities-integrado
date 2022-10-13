import { Request, Response } from "express";
import {
  getAllUniversitiesService,
  getUniversityService,
} from "../services/universitiesService.js";

export async function getAllUniversities(req: Request, res: Response) {
  const countryQuery = req.query.country as string | string[];
  const pageQuery = req.query.page as string;
  const universitiesList = await getAllUniversitiesService(
    countryQuery,
    parseInt(pageQuery)
  );
  res.status(200).send(universitiesList);
}

export async function getUniversity(req: Request, res: Response) {
  const universityId = req.params.id;

  const universityData = await getUniversityService(universityId);

  res.status(200).send(universityData);
}
