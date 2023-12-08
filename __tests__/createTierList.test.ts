import request from "supertest";
import { jest } from "@jest/globals";
import { TierList } from "../src/db/schema";
import { mocked } from "jest-mock";

import makeApp from "../src/app";
import { allowedUrl } from "./mocks/allowedUrl";
import { tierListData } from "./mocks/tierListData";

jest.mock("../src/db/schema");

const app = makeApp(() => console.log("mock database"));

describe("Test app.ts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("POST to /tier-list should be successful", async () => {
    const mockedTierList = mocked(TierList).create.mockResolvedValue({
      tierList: "test tier list",
    } as any);

    const res = await request(app)
      .post("/tier-list")
      .set("Origin", allowedUrl)
      .send(tierListData);

    expect(mockedTierList.mock.calls).toHaveLength(1);
    expect(res.body.data).toMatchObject({
      tierList: "test tier list",
    });
    expect(res.status).toBe(201);
  });
  it("POST to /tier-list should not be successful", async () => {
    const mockedTierList = mocked(TierList).create.mockResolvedValue({
      tierList: "test tier list",
    } as any);

    const res = await request(app)
      .post("/tier-list")
      .set("Origin", allowedUrl)
      .send({ fail: "wrong data" });

    expect(res.status).toBe(400);
    expect(mockedTierList.mock.calls).toHaveLength(0);
  });
});
