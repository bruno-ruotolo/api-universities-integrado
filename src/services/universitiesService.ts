import { getAllUniversities } from "../repositories/universitiesRepository.js";

export async function getAllUniversitiesService(
  countryQuery: string | string[]
) {
  const universitiesList = await getAllUniversities(countryQuery);
  return universitiesList;
}
