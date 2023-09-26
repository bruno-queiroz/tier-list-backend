import { Request, Response } from "express";
import { TierList } from "../db/schema";

export const getTierLists = async (req: Request, res: Response) => {
  try {
    const allTierLists = await TierList.find();

    res.json({ data: allTierLists, msg: "All Tier Lists", isOk: true });
  } catch (err) {
    console.log(err);
    res.json({ msg: "Something went wrong", isOk: false });
  }
};
