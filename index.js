import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { initlization } from "./src/Route.js";
import { connectionDB } from "./DB/connection.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "./config/.env") });
const port = process.env.PORT;

initlization(app);

export default app;
connectionDB();
app.use("*", (req, res) =>
  res.send("In-valid Routing Plz check url")
);
app.get("/", (req, res) => {
  res.send("done");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
