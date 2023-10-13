import request from "supertest";
import { jest } from "@jest/globals";
import { TierList } from "../src/db/schema";
import { mocked } from "jest-mock";

import makeApp from "../src/app";

jest.mock("../src/db/schema");

const app = makeApp(() => console.log("mock database"));

const tierListData = {
  tierList: [
    { color: "#fff", text: "A", tierListSelectedItems: [{ src: "image" }] },
  ],
  tierListName: "test tier list",
  tierListItems: [{ src: "image" }],
  tierListImage: "image",
};

describe("Test app.ts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("POST to /tier-list should be successful", async () => {
    const mockedTierList = mocked(TierList).create.mockResolvedValue({
      tierList: "test tier list",
    } as any);

    const res = await request(app).post("/tier-list").send(tierListData);

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
      .send({ fail: "wrong data" });

    expect(res.status).toBe(400);
    expect(mockedTierList.mock.calls).toHaveLength(0);
  });
});
