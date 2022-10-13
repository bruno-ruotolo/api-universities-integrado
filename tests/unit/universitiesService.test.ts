import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";

import * as universitiesService from "../../src/services/universitiesService.js";
import universitiesRepository from "../../src/repositories/universitiesRepository.js";
import { badRequestError } from "../../src/utils/errorUtils.js";

jest.mock("../../src/repositories/universitiesRepository");
jest.resetAllMocks();
jest.clearAllMocks();

describe("get all universities unit tests suite", () => {
  it("given no query, should call getAllUniversities", async () => {
    const QUERY = null;

    jest
      .spyOn(universitiesRepository, "getAllUniversities")
      .mockImplementationOnce((): any => {});

    await universitiesService.getAllUniversitiesService(QUERY);

    expect(universitiesService.getAllUniversitiesService).resolves;
    expect(universitiesRepository.getAllUniversities).toBeCalled();
  });

  it("given an query, should call getAllUniversities", async () => {
    const QUERY = [""];

    jest
      .spyOn(universitiesRepository, "getUniversitiesFilteredByCountry")
      .mockImplementationOnce((): any => {});

    await universitiesService.getAllUniversitiesService(QUERY);

    expect(universitiesService.getAllUniversitiesService).resolves;
    expect(
      universitiesRepository.getUniversitiesFilteredByCountry
    ).toBeCalled();
  });
});

describe("get an university unit tests suite", () => {
  it("given a valid id, should call getUniversityById", async () => {
    const ID = faker.random.numeric(24);

    jest
      .spyOn(universitiesRepository, "getUniversityById")
      .mockImplementationOnce((): any => {});

    await universitiesService.getUniversityService(ID);

    expect(universitiesService.getUniversityService).resolves;
    expect(universitiesRepository.getUniversityById).toBeCalled();
  });

  it("given an invalid id, should call badRequestError", async () => {
    const ID = faker.random.numeric(10);

    jest
      .spyOn(universitiesRepository, "getUniversityById")
      .mockImplementationOnce((): any => {});

    const promise = universitiesService.getUniversityService(ID);

    expect(promise).rejects.toEqual(badRequestError("Invalid university Id"));
  });
});
