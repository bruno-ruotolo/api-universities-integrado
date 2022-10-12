import axios from "axios";
import { db, mongoClient } from "../config/db.js";

async function retrieveUniversities() {
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
    await storeUniversities(universitiesList);

    console.log(
      "All required universities have been successfully stored in the database"
    );
  } catch (error) {
    console.log("Something got wrong", error);
  }
}
retrieveUniversities();

async function storeUniversities(universitiesList: any) {
  console.log("Storing Universities on DB...");
  await db.collection("universities").insertMany(universitiesList);
  mongoClient.close();
}
