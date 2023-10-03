import mongoose from "mongoose";
import app from "./app";

const port = 3000;

mongoose.connection.on("connected", () => {
  app.listen(port, () => {
    [console.log("server running at", port)];
  });
});
