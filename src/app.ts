import express from "express";
import cors from "cors";
import { connectToDB } from "./db/access";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createTierList } from "./controllers/createTierList";
import { getTierLists } from "./controllers/getTierLists";
import { getSpecificTierList } from "./controllers/getSpecificTierList";
import { updateTierList } from "./controllers/updateTierList";
import { updateTierListItems } from "./controllers/updateTierListItems";
const proxy = require("html2canvas-proxy");
dotenv.config();

const corsOptions = {
  origin: "http://localhost:5173",
};

const app = express();
connectToDB();

app.use(express.json());
app.use(cors(corsOptions));
app.use(proxy());

app.post("/create-tier-list", createTierList);
app.get("/get-tier-lists", getTierLists);
app.get("/get-tier-list/:tierListId", getSpecificTierList);
app.patch("/update-tier-list/:tierListId", updateTierList);
app.patch("/update-tier-list-items/:tierListId", updateTierListItems);

mongoose.connection.on("connected", () => {
  app.listen(3000, () => {
    [console.log("server running")];
  });
});
