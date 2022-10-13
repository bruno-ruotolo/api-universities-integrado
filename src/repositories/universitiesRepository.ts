import { db } from "../config/db.js";

async function getAllUniversities() {
  return await db.collection("universities").find().toArray();
}

async function getUniversitiesFilteredByCountry(query: string) {
  return await db
    .collection("universities")
    .find({ country: { $regex: `^${query}$`, $options: "i" } })
    .toArray();
}

const universitiesRepository = {
  getAllUniversities,
  getUniversitiesFilteredByCountry,
};

export default universitiesRepository;
