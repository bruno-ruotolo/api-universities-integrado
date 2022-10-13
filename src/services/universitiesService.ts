import universitiesRepository from "../repositories/universitiesRepository.js";

export async function getAllUniversitiesService(
  countryQuery: string | string[]
) {
  if (countryQuery) {
    const queries =
      typeof countryQuery === "string" ? [countryQuery] : countryQuery;
    let universitiesList = [];
    for (let query of queries) {
      const universities =
        await universitiesRepository.getUniversitiesFilteredByCountry(query);
      universitiesList = universitiesList.concat(universities);
    }
    return universitiesList;
  }

  const universitiesList = await universitiesRepository.getAllUniversities();
  return universitiesList;
}
