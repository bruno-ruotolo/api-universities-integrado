import { ObjectId } from "mongodb";
import { db } from "../config/db.js";

async function getAllUniversities(PAGINATION: number, DATA_LIMIT: number) {
  return await db
    .collection("universities")
    .aggregate([
      {
        $project: {
          name: 1,
          _id: 1,
          country: 1,
          "state-province": 1,
        },
      },
    ])
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
    .aggregate([
      {
        $project: {
          name: 1,
          _id: 1,
          country: 1,
          "state-province": 1,
        },
      },
      {
        $match: {
          country: {
            $regex: `^${countryQuery}$`,
            $options: "i",
          },
        },
      },
    ])
    .skip(PAGINATION)
    .limit(DATA_LIMIT)
    .toArray();
}

async function getUniversityById(id: string) {
  return await db.collection("universities").findOne({ _id: new ObjectId(id) });
}

const universitiesRepository = {
  getAllUniversities,
  getUniversitiesFilteredByCountry,
  getUniversityById,
};

export default universitiesRepository;
