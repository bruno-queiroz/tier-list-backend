import { Request, Response } from "express";
import { TierList } from "../db/schema";

export const createTierList = (req: Request, res: Response) => {
  TierList.create(req.body);

  res.json({ msg: "You Tier List was created !", isOk: true });
};
