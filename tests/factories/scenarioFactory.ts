import axios from "axios";

import { CreateUniversity } from "./../../src/interfaces/index";
import { db } from "../../src/config/db.js";

export async function resetData() {
  await db.collection("universities").deleteMany({});
  const insertedCount = await retrieveUniversities();
  return insertedCount;
}

export default async function retrieveUniversities() {
  const baseUrl = "http://universities.hipolabs.com/search?country=";

  const requiredCountrys = [
    "argentina",
    "brazil",
    "chile",
    "colombia",
    "paraguay",
    "peru",
    "suriname",
    "uruguay",
  ];

  let universitiesList = [];

  try {
    console.log("Receiving Universities...");

    for (let country of requiredCountrys) {
      const universities = await axios.get(`${baseUrl}${country}`);
      universitiesList = universitiesList.concat(universities.data);
    }
    const insertedCount = await storeUniversities(universitiesList);

    console.log(
      "All required universities have been successfully stored in the database"
    );

    return insertedCount;
  } catch (error) {
    console.log("Something got wrong", error);
  }
}

async function storeUniversities(universitiesList: any) {
  console.log("Storing Universities on DB...");
  const result = await db
    .collection("universities")
    .insertMany(universitiesList);
  const { insertedCount } = result;
  return insertedCount;
}

export async function createUniversityFactory(data: CreateUniversity) {
  return await db.collection("universities").insertOne(data);
}
