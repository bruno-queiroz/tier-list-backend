import { Request, Response } from "express";
import { TierList } from "../db/schema";
import { CreateTierListSchema } from "./schemas/createTierListSchema";

export const createTierList = (req: Request, res: Response) => {
  try {
    CreateTierListSchema.parse(req.body);

    TierList.create(req.body);

    res.json({ msg: "You Tier List was created!", isOk: true });
  } catch (err) {
    console.log(err);
    res.json({
      msg: "Something went wrong creating your Tier List",
      isOk: false,
    });
  }
};
