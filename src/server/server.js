const express = require("express");
const dotenv = require("dotenv");
const compression = require("compression");
const cors = require("cors");
const router = require("./routes");
const pkg = require("../../package.json");
const routeNotFound = require("./middleware/routeNotFound");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");

dotenv.config();

const app = express();
app.use(cors());
app.use(compression());
app.get("/", async (req, res) => res.json({ root: true }));
app.get(`/v${pkg.version.at(0)}/api/assets/:file`, async (req, res) =>
  res.sendFile(path.join(__dirname, "../../", `public/assets/${req.params.file}`))
);
app.get(`/v${pkg.version.at(0)}/api/version`, async (req, res) => res.json({ version: pkg.version.at(0) }));
app.use(`/v${pkg.version.at(0)}/api/`, router);

app.use(routeNotFound);
app.use(errorHandler);
module.exports = app;
