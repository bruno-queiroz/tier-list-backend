import { Request, Response } from "express";
import { TierList } from "../db/schema";

export const getSpecificTierList = async (req: Request, res: Response) => {
  try {
    const { tierListId } = req.params;

    const tierList = await TierList.findById({ _id: tierListId });

    res
      .status(200)
      .json({ data: tierList, msg: "Tier List found", isOk: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Tier List not found", isOk: false });
  }
};
