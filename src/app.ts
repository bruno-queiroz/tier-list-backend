import express from "express";
import cors, { CorsOptions } from "cors";
import { connectToDB } from "./db/access";
import dotenv from "dotenv";
import { createTierList } from "./controllers/createTierList";
import { getTierLists } from "./controllers/getTierLists";
import { getSpecificTierList } from "./controllers/getSpecificTierList";
import { updateTierList } from "./controllers/updateTierList";
import { updateTierListItems } from "./controllers/updateTierListItems";
const proxy = require("html2canvas-proxy");
dotenv.config();

const allowedUrls = [
  "http://localhost:5173",
  "https://tier-list-rho.vercel.app",
  "https://tier-list-creator-bruno-queiroz.vercel.app",
];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    callback(null, true);

    // if (allowedUrls.indexOf(origin || "") !== -1) {
    //   callback(null, true);
    // } else {
    //   callback(new Error("Not Allowed by CORS"));
    // }
  },
};

const app = express();
connectToDB();

app.use(express.json());
app.use(cors(corsOptions));
app.use(proxy());

app.get("/tier-list", getTierLists);
app.get("/tier-list/:tierListId", getSpecificTierList);

app.post("/tier-list", createTierList);

app.patch("/tier-list/:tierListId", updateTierList);
app.patch("/tier-list-items/:tierListId", updateTierListItems);

export default app;
