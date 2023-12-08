import request from "supertest";
import { jest } from "@jest/globals";
import { TierList } from "../src/db/schema";
import { mocked } from "jest-mock";

import makeApp from "../src/app";
import { allowedUrl } from "./mocks/allowedUrl";

jest.mock("../src/db/schema");

const app = makeApp(() => console.log("mock database"));

describe("Test app.ts", () => {
  it("GET to /tier-list should be successful", async () => {
    mocked(TierList).find.mockResolvedValue([{ tierList: [] }]);

    const res = await request(app).get("/tier-list").set("Origin", allowedUrl);

    expect(res.body.data).toMatchObject([{ tierList: [] }]);
    expect(res.status).toBe(200);
  });
  it("GET to /tier-list should not be successful", async () => {
    mocked(TierList).find.mockRejectedValue([
      { msg: "failed to get tierlists" },
    ]);

    const res = await request(app).get("/tier-list").set("Origin", allowedUrl);

    expect(res.status).toBe(500);
  });
});
