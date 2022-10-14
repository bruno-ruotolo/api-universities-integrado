import { Blob } from "node:buffer";

import { UpdateUniversity } from "./../interfaces/index";
import universitiesRepository from "../repositories/universitiesRepository.js";
import {
  badRequestError,
  conflictError,
  notFoundError,
} from "../utils/errorUtils.js";
import { CreateUniversity } from "../interfaces/index.js";

export async function getAllUniversitiesService(
  countryQuery: string | string[],
  pageQuery: number = 1
) {
  const DATA_LIMIT = 20;
  const PAGINATION = pageQuery > 0 ? DATA_LIMIT * (pageQuery - 1) : 0;
  if (countryQuery) {
    const queries =
      typeof countryQuery === "string" ? [countryQuery] : countryQuery;
    let universitiesList = [];
    for (let countryQuery of queries) {
      const universities =
        await universitiesRepository.getUniversitiesFilteredByCountry(
          countryQuery,
          PAGINATION,
          DATA_LIMIT
        );
      universitiesList = universitiesList.concat(universities);
    }
    return universitiesList;
  }

  const universitiesList = await universitiesRepository.getAllUniversities(
    PAGINATION,
    DATA_LIMIT
  );
  return universitiesList;
}

export async function getUniversityService(universityId: string) {
  const byteSize = (str: string) => new Blob([str]).size;
  if (byteSize(universityId) === 12 || universityId.length === 24) {
    return await universitiesRepository.getUniversityById(universityId);
  }
  throw badRequestError("Invalid university Id");
}

export async function createUniversityService(
  universityData: CreateUniversity
) {
  const { name, country } = universityData;
  if (!universityData["state-province"]) {
    universityData["state-province"] = null;
  }

  await checkUniversityExistByNameCountryState(
    name,
    country,
    universityData["state-province"]
  );
  await universitiesRepository.createUniversity(universityData);
}

export async function updateUniversityService(
  universityData: UpdateUniversity,
  universityId: string
) {
  await checkUniversityExistById(universityId);
  await universitiesRepository.updateUniversity(universityData, universityId);
}

export async function deleteUniversityService(universityId: string) {
  await checkUniversityExistById(universityId);
  await universitiesRepository.deleteUniversity(universityId);
}

async function checkUniversityExistByNameCountryState(
  name: string,
  country: string,
  state: string
) {
  const university =
    await universitiesRepository.getUniversityByNameByCountryByState(
      name,
      country,
      state
    );

  if (university) {
    throw conflictError("This university is already registered");
  }
}

async function checkUniversityExistById(id: string) {
  const university = await universitiesRepository.getUniversityById(id);

  if (!university) {
    throw notFoundError("This university do not exist");
  }
}
