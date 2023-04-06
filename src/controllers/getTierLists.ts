import { Request, Response } from "express";
import { TierList } from "../db/schema";

export const getTierLists = async (req: Request, res: Response) => {
  const allTierLists = await TierList.find();

  res.json(allTierLists);
};
