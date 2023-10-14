import request from "supertest";
import { jest } from "@jest/globals";
import { TierList } from "../src/db/schema";
import { mocked } from "jest-mock";

import makeApp from "../src/app";

jest.mock("../src/db/schema");

const app = makeApp(() => console.log("mock database"));

const tierListData = [
  {
    src: "",
  },
];

describe("Test app.ts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("PATCH to /tier-list-items/:tierListId should be successful", async () => {
    const mockedTierList = mocked(TierList).findByIdAndUpdate.mockResolvedValue(
      {
        tierList: "test tier list",
      } as any
    );

    const res = await request(app)
      .patch("/tier-list-items/123")
      .send(tierListData);

    expect(mockedTierList.mock.calls).toHaveLength(1);
    expect(res.body.data).toMatchObject({
      tierList: "test tier list",
    });
    expect(res.status).toBe(200);
  });
  it("PATCH to /tier-list-items/:tierListId should not be successful", async () => {
    const mockedTierList = mocked(TierList).findByIdAndUpdate.mockResolvedValue(
      {
        tierList: "test tier list",
      } as any
    );

    const res = await request(app)
      .patch("/tier-list-items/123")
      .send({ fail: "wrong data" });

    expect(res.status).toBe(400);
    expect(mockedTierList.mock.calls).toHaveLength(0);
  });
});
