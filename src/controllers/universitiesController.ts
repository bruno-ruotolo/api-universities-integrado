import { CreateUniversity, UpdateUniversity } from "./../interfaces/index";
import { Request, Response } from "express";
import {
  createUniversityService,
  deleteUniversityService,
  getAllUniversitiesService,
  getUniversityService,
  updateUniversityService,
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

export async function createUniversity(req: Request, res: Response) {
  const universityData: CreateUniversity = req.body;

  await createUniversityService(universityData);

  res.sendStatus(201);
}

export async function updateUniversity(req: Request, res: Response) {
  const universityId = req.params.id;
  const universityData: UpdateUniversity = req.body;

  await updateUniversityService(universityData, universityId);

  res.sendStatus(201);
}

export async function deleteUniversity(req: Request, res: Response) {
  const universityId = req.params.id;

  await deleteUniversityService(universityId);

  res.sendStatus(201);
}
