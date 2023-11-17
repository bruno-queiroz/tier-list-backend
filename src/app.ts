import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createTierList } from "./controllers/createTierList";
import { getTierLists } from "./controllers/getTierLists";
import { getSpecificTierList } from "./controllers/getSpecificTierList";
import { updateTierList } from "./controllers/updateTierList";
import { updateTierListItems } from "./controllers/updateTierListItems";
import { corsOptions } from "./cors/options";

const proxy = require("html2canvas-proxy");
dotenv.config();

export default function (database: () => void) {
  const app = express();
  database();

  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(proxy());

  app.get("/tier-list", getTierLists);
  app.get("/tier-list/:tierListId", getSpecificTierList);

  app.post("/tier-list", createTierList);

  app.patch("/tier-list/:tierListId", updateTierList);
  app.patch("/tier-list-items/:tierListId", updateTierListItems);

  return app;
}
