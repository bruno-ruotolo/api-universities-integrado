import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";

import * as universitiesService from "../../src/services/universitiesService.js";
import universitiesRepository from "../../src/repositories/universitiesRepository.js";

import {
  badRequestError,
  conflictError,
  notFoundError,
} from "../../src/utils/errorUtils.js";

jest.mock("../../src/repositories/universitiesRepository");
jest.resetAllMocks();
jest.clearAllMocks();

describe("universitios unit tests suite", () => {
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
