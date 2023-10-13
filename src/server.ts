import mongoose from "mongoose";
import makeApp from "./app";
import { connectToDB } from "./db/access";

const port = 3000;

const app = makeApp(connectToDB);

mongoose.connection.on("connected", () => {
  app.listen(port, () => {
    [console.log("server running at", port)];
  });
});
