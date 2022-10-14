import {
  CreateUniversity,
  UpdateUniversity,
} from "./../../src/interfaces/index";
import { faker } from "@faker-js/faker";
import { db } from "../../src/config/db.js";

export async function getAnUniversityId() {
  const universitiesList = await db.collection("universities").find().toArray();
  const { _id } =
    universitiesList[Math.floor(Math.random() * universitiesList.length)];

  return _id.toString();
}

export function createFakeUniversityData() {
  const DATA: CreateUniversity = {
    alpha_two_code: faker.address.countryCode("alpha-2"),
    web_pages: [faker.internet.domainName(), faker.internet.domainName()],
    name: faker.internet.userName(),
    country: faker.address.country(),
    domains: [faker.internet.domainWord(), faker.internet.domainWord()],
    "state-province": faker.address.state(),
  };

  return DATA;
}

export function createFakeUpdateUniversityData() {
  const DATA: UpdateUniversity = {
    web_pages: [faker.internet.domainName(), faker.internet.domainName()],
    name: faker.internet.userName(),
    domains: [faker.internet.domainWord(), faker.internet.domainWord()],
  };

  return DATA;
}
