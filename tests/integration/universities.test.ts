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
    const UNIVERSITIES_TOTAL_QUANTITY = insertedCount;

    const result = await agent.get(`/universities`);
    const { statusCode } = result;

    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result).not.toBeFalsy();
    expect(result.body).toHaveLength(UNIVERSITIES_TOTAL_QUANTITY);
    expect(statusCode).toBe(200);
  });
});
