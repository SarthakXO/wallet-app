const express = require("express");
const router = require("./routes/index");
const cors = require("cors");
port = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

app.listen(port);
