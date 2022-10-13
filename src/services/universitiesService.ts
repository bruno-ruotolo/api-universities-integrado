import universitiesRepository from "../repositories/universitiesRepository.js";
import { Blob } from "node:buffer";
import { badRequestError } from "../utils/errorUtils.js";

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
