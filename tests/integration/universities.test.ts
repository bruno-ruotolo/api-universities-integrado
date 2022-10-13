import app from "../../src/app.js";
import supertest from "supertest";
import { resetData } from "../factories/scenarioFactory.js";

let insertedCount = 0;
beforeEach(async () => {
  insertedCount = await resetData();
});
const agent = supertest(app);

describe("GET /universities test suite", () => {
  it("given no filter, return 200 and all universities", async () => {
    const UNIVERSITIES_TOTAL_QUANTITY = insertedCount > 20 ? 20 : insertedCount;

    const result = await agent.get(`/universities`);
    ("");
    const { statusCode } = result;

    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result).not.toBeFalsy();
    expect(result.body).toHaveLength(UNIVERSITIES_TOTAL_QUANTITY);
    expect(statusCode).toBe(200);
  });

  it("given one country filter, return 200 and filtered universities", async () => {
    const COUNTRY_FILTER = "Uruguay";

    const result = await agent.get(`/universities?country=${COUNTRY_FILTER}`);
    const { statusCode } = result;

    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result).not.toBeFalsy();
    expect(result.body.length).toBeLessThanOrEqual(20);
    expect(result.body[0].country).toEqual(COUNTRY_FILTER);
    expect(statusCode).toBe(200);
  });

  it("given two country filter, return 200 and filtered universities", async () => {
    const COUNTRY_FILTER = "Uruguay";
    const SECOND_COUNTRY_FILTER = "Suriname";

    const result = await agent.get(
      `/universities?country=${COUNTRY_FILTER}&country=${SECOND_COUNTRY_FILTER}`
    );
    const { statusCode } = result;

    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result).not.toBeFalsy();
    expect(result.body.length).toBeLessThanOrEqual(20);
    expect(result.body[0].country).toEqual(COUNTRY_FILTER);
    expect(result.body[result.body.length - 1].country).toEqual(
      SECOND_COUNTRY_FILTER
    );
    expect(statusCode).toBe(200);
  });

  it("given two country filter and page, return 200 and filtered universities", async () => {
    const PAGE = 2;
    const COUNTRY_FILTER = "Uruguay";
    const SECOND_COUNTRY_FILTER = "Suriname";

    const result = await agent.get(
      `/universities?country=${COUNTRY_FILTER}&country=${SECOND_COUNTRY_FILTER}&page=${PAGE}`
    );
    const { statusCode } = result;

    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result).not.toBeFalsy();
    expect(result.body.length).toBeLessThanOrEqual(20);
    expect(statusCode).toBe(200);
  });
});
