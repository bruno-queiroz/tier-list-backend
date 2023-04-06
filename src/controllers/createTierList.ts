import { Request, Response } from "express";
import { TierList } from "../db/schema";

export const createTierList = (req: Request, res: Response) => {
  TierList.create(req.body);

  res.json({ msg: "tierList created" });
};
