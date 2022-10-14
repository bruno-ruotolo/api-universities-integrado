import { CreateUniversity, UpdateUniversity } from "./../interfaces/index";
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

async function getUniversityByNameByCountryByState(
  name: string,
  country: string,
  state: string
) {
  return await db
    .collection("universities")
    .findOne({ name, country, "state-province": state });
}

async function createUniversity(data: CreateUniversity) {
  return await db.collection("universities").insertOne(data);
}

async function updateUniversity(data: UpdateUniversity, id: string) {
  const { web_pages, name, domains } = data;
  return await db
    .collection("universities")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { web_pages, name, domains } }
    );
}

async function deleteUniversity(id: string) {
  return await db
    .collection("universities")
    .deleteOne({ _id: new ObjectId(id) });
}

const universitiesRepository = {
  getAllUniversities,
  getUniversitiesFilteredByCountry,
  getUniversityById,
  getUniversityByNameByCountryByState,
  createUniversity,
  updateUniversity,
  deleteUniversity,
};

export default universitiesRepository;
