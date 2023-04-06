import { Request, Response } from "express";
import { TierList } from "../db/schema";

export const getSpecificTierList = async (req: Request, res: Response) => {
  const { tierListId } = req.params;
  const tierList = await TierList.findById({ _id: tierListId });
  res.json(tierList);
};
