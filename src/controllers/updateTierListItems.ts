import { Request, Response } from "express";
import { TierList } from "../db/schema";
import { UpdateTierListItemsSchema } from "../validators/updateTierListItemsSchema";

export const updateTierListItems = async (req: Request, res: Response) => {
  try {
    const { tierListId } = req.params;

    UpdateTierListItemsSchema.parse(req.body);

    const tierListItems = await TierList.findByIdAndUpdate(tierListId, {
      tierListItems: req.body,
    });

    res.status(200).json({
      data: tierListItems,
      msg: "Tier List Items updated",
      isOk: true,
    });
  } catch (err) {
    console.error("Error patching tier list items", err);

    res.status(400).json({
      msg: "Something went wrong updating Tier List Items",
      isOk: false,
    });
  }
};
