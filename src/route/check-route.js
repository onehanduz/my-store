const express = require("express");
const { getAll, createDB } = require("../controller/check-controller");
const checkRouter = express.Router();

checkRouter.get("/", async (req, res) => {
  const all = await getAll();
  res.render("check/main", { ...all });
});
checkRouter.post("/", (req, res) => {
  const creater = createDB(req);
  res.redirect("/sell");
});
module.exports = checkRouter;
