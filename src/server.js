const configViewEngine = require("./config/viewEngine");
const express = require("express");
const webRouters = require("./routes/web");
const apiRouters = require("./routes/api");
const connection = require("./config/database");
const fileUpload = require("express-fileupload");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;
// Config View engine
configViewEngine(app);
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Config router
app.use("/", webRouters);
app.use("/v1/api", apiRouters);
(async () => {
  try {
    await connection();
    app.listen(port, () => {
      console.log(`BACKEND-API app listening on port ${port}`);
    });
  } catch (error) {
    console.log("🚀 >>>>> error connect DB:", error);
  }
})();
