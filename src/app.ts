import express from "express";
import cors from "cors";
import { connectToDB } from "./db/access";
import { TierList } from "./db/schema";
import multer, { Multer } from "multer";
import { storage } from "./multerStorageConfig";
import { createImgUrl } from "./util/createImgUrl";

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

interface FileRequest {
  [key: string]: MulterFile[];
}

const upload = multer({ storage });
const cpUpload = upload.fields([
  { name: "tierListItems" },
  { name: "tierListImage" },
]);

const corsOptions = {
  origin: "http://localhost:5173",
};

const app = express();
connectToDB();

app.use(express.static("images"));
app.use(cors(corsOptions));
app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ limit: "16mb", extended: true }));

app.post("/create-tier-list", cpUpload, (req, res) => {
  const { tierListName, tierList } = req.body;
  const tierListImage = createImgUrl(
    (req?.files as unknown as FileRequest)?.tierListImage?.[0]?.path
  );
  const tierListItems = (
    req?.files as unknown as FileRequest
  )?.tierListItems.map((tierListItem) => createImgUrl(tierListItem?.path));

  const newTierList = {
    tierListName,
    tierListImage,
    tierList,
    tierListItems,
  };
  TierList.create(newTierList);
});

app.get("/get-tier-lists", async (req, res) => {
  const allTierLists = await TierList.find();

  res.json(allTierLists);
});

app.listen(3000, () => {
  [console.log("server running")];
});
