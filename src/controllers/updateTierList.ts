import { Request, Response } from "express";
import { TierList } from "../db/schema";

export const updateTierList = async (req: Request, res: Response) => {
  const { tierListId } = req.params;

  await TierList.findByIdAndUpdate(tierListId, {
    tierList: JSON.stringify(req.body),
  });

  res.json({ msg: "updated" });
};
