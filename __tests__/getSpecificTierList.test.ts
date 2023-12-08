import request from "supertest";
import { jest } from "@jest/globals";
import { TierList } from "../src/db/schema";
import { mocked } from "jest-mock";

import makeApp from "../src/app";
import { allowedUrl } from "./mocks/allowedUrl";

jest.mock("../src/db/schema");

const app = makeApp(() => console.log("mock database"));

describe("Test app.ts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("GET to /tier-list/:tierListId should be successful", async () => {
    const mockedTierList = mocked(TierList).findById.mockResolvedValue([
      { tierList: [] },
    ]);
    const res = await request(app)
      .get(`/tier-list/${123}`)
      .set("Origin", allowedUrl);

    expect(mockedTierList.mock.calls).toHaveLength(1);
    expect(mockedTierList.mock.calls[0]).toMatchObject([{ _id: "123" }]);
    expect(res.body.data).toMatchObject([{ tierList: [] }]);
    expect(res.status).toBe(200);
  });
  it("GET to /tier-list/:tierListId should not be successful", async () => {
    const mockedTierList = mocked(TierList).findById.mockRejectedValue([
      { msg: "failed to get tierlist" },
    ]);

    const res = await request(app)
      .get(`/tier-list/${567}`)
      .set("Origin", allowedUrl);

    expect(mockedTierList.mock.calls).toHaveLength(1);
    expect(mockedTierList.mock.calls[0]).toMatchObject([{ _id: "567" }]);
    expect(res.status).toBe(400);
  });
});
