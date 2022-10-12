import { db } from "../config/db.js";

export async function getAllUniversities(countryQuery: string | string[]) {
  typeof countryQuery === "string";

  const queries =
    typeof countryQuery === "string" ? [countryQuery] : countryQuery;
  let universitiesList = [];

  if (countryQuery) {
    for (let query of queries) {
      const universities = await db
        .collection("universities")
        .find({ country: { $regex: `^${query}$`, $options: "i" } })
        .toArray();
      universitiesList = universitiesList.concat(universities);
    }
    return universitiesList;
  }

  return await db.collection("universities").find().toArray();
}
