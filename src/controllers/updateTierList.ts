import { Request, Response } from "express";
import { TierList } from "../db/schema";
import { UpdateTierListSchema } from "../validators/updateTierListSchema";

export const updateTierList = async (req: Request, res: Response) => {
  try {
    const { tierListId } = req.params;

    const tierListValidated = UpdateTierListSchema.parse(req.body);

    await TierList.findByIdAndUpdate(tierListId, tierListValidated);

    res.json({ data: tierListValidated, msg: "Tier List updated", isOk: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "Something went wrong updating your Tier List",
      isOk: false,
    });
  }
};
