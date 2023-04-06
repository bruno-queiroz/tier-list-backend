import { Request, Response } from "express";
import { TierList } from "../db/schema";

export const updateTierListItems = async (req: Request, res: Response) => {
  const { tierListId } = req.params;

  await TierList.findByIdAndUpdate(tierListId, { tierListItems: req.body });

  res.json({ msg: "updated" });
};
