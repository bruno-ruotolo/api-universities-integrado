import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";

import { CreateUniversity } from "./../../src/interfaces/index";
import * as universitiesService from "../../src/services/universitiesService.js";
import universitiesRepository from "../../src/repositories/universitiesRepository.js";
import { badRequestError, conflictError } from "../../src/utils/errorUtils.js";
import { createFakeUniversityData } from "../factories/universitesFactory.js";

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

describe("create an university unit tests suite", () => {
  it("given valid infos, should call getUniversityByNameByCountryByState and createUniversity", async () => {
    const DATA: CreateUniversity = createFakeUniversityData();

    jest
      .spyOn(universitiesRepository, "getUniversityByNameByCountryByState")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(universitiesRepository, "createUniversity")
      .mockImplementationOnce((): any => {});

    await universitiesService.createUniversityService(DATA);

    expect(universitiesService.createUniversityService).resolves;
    expect(
      universitiesRepository.getUniversityByNameByCountryByState
    ).toBeCalled();
    expect(universitiesRepository.createUniversity).toBeCalled();
  });

  it("given registered university, should return conflict error", async () => {
    const DATA: CreateUniversity = createFakeUniversityData();

    jest
      .spyOn(universitiesRepository, "getUniversityByNameByCountryByState")
      .mockImplementationOnce((): any => {
        return DATA;
      });
    const promise = universitiesService.createUniversityService(DATA);

    expect(promise).rejects.toEqual(
      conflictError("This university is already registered")
    );
    expect(
      universitiesRepository.getUniversityByNameByCountryByState
    ).toBeCalled();
  });
});
