import { db } from "../config/db.js";

async function getAllUniversities(PAGINATION: number, DATA_LIMIT: number) {
  return await db
    .collection("universities")
    .find()
    .skip(PAGINATION)
    .limit(DATA_LIMIT)
    .toArray();
}

async function getUniversitiesFilteredByCountry(
  countryQuery: string,
  PAGINATION: number,
  DATA_LIMIT: number
) {
  return await db
    .collection("universities")
    .find({ country: { $regex: `^${countryQuery}$`, $options: "i" } })
    .skip(PAGINATION)
    .limit(DATA_LIMIT)
    .toArray();
}

const universitiesRepository = {
  getAllUniversities,
  getUniversitiesFilteredByCountry,
};

export default universitiesRepository;
