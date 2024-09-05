const express = require("express");
const ex_handle = require("express-handlebars");
const app = express();
const bodyParser = require("body-parser");
const route = require("./route");

app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(route);
//handlebars
app.engine("handlebars", ex_handle.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
