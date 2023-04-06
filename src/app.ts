import express from "express";
import cors from "cors";
import { connectToDB } from "./db/access";
import { TierList } from "./db/schema";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const proxy = require("html2canvas-proxy");

const corsOptions = {
  origin: "http://localhost:5173",
};

const app = express();
connectToDB();

app.use(express.json());
app.use(cors(corsOptions));
app.use(proxy());

app.post("/create-tier-list", (req, res) => {
  TierList.create(req.body);

  res.json({ msg: "tierList created" });
});

app.get("/get-tier-lists", async (req, res) => {
  const allTierLists = await TierList.find();

  res.json(allTierLists);
});

app.get("/get-tier-list/:tierListId", async (req, res) => {
  const { tierListId } = req.params;
  const tierList = await TierList.findById({ _id: tierListId });
  res.json(tierList);
});

app.patch("/update-tier-list/:tierListId", async (req, res) => {
  const { tierListId } = req.params;

  await TierList.findByIdAndUpdate(tierListId, {
    tierList: JSON.stringify(req.body),
  });

  res.json({ msg: "updated" });
});

app.patch("/update-tier-list-items/:tierListId", async (req, res) => {
  const { tierListId } = req.params;

  await TierList.findByIdAndUpdate(tierListId, { tierListItems: req.body });

  res.json({ msg: "updated" });
});

mongoose.connection.on("connected", () => {
  app.listen(3000, () => {
    [console.log("server running")];
  });
});
