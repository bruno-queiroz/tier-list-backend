import { Request, Response } from "express";
import { TierList } from "../db/schema";
import { CreateTierListSchema } from "./schemas/createTierListSchema";

export const createTierList = async (req: Request, res: Response) => {
  try {
    CreateTierListSchema.parse(req.body);

    const tierList = await TierList.create(req.body);

    res
      .status(201)
      .json({ data: tierList, msg: "You Tier List was created!", isOk: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "Something went wrong creating your Tier List",
      isOk: false,
    });
  }
};
