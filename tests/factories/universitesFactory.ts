import { db } from "../../src/config/db.js";

export async function getAnUniversityId() {
  const universitiesList = await db.collection("universities").find().toArray();
  const { _id } =
    universitiesList[Math.floor(Math.random() * universitiesList.length)];

  return _id.toString();
}
