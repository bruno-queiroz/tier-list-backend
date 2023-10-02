import { Request, Response } from "express";
import { TierList } from "../db/schema";

export const getTierLists = async (req: Request, res: Response) => {
  try {
    const allTierLists = await TierList.find();

    res
      .status(200)
      .json({ data: allTierLists, msg: "All Tier Lists", isOk: true });
  } catch (err) {
    console.error(err);

    res.status(500).json({ msg: "Something went wrong", isOk: false });
  }
};
