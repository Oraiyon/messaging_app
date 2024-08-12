import ViteExpress from "vite-express";
import makeApp from "./app.js";
import database from "./databases/mongoConfig.js";
import dotenv from "dotenv";

dotenv.config();

const app = makeApp(database);
const PORT = process.env.PORT || 3000;

ViteExpress.listen(app, PORT, () => console.log(`Server is listening on port ${PORT}...`));
