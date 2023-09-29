import mongoose from "mongoose";
const { Schema } = mongoose;

const tierListSchema = new Schema({
  tierListName: String,
  tierListImage: String,
  tierList: [
    {
      color: String,
      text: String,
      tierListSelectedItems: [
        {
          src: String,
          opacity: String,
        },
      ],
    },
  ],
  tierListItems: [{ src: String }],
});

export const TierList = mongoose.model("TierList", tierListSchema);
