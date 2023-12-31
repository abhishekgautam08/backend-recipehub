require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/index");
const connectToMongo = require("./database");

const app = express();

app.use(cors());

const port = process.env.PORT;

connectToMongo();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Health Api");
});

app.listen(port, () => {
  console.log(`Recipehub Backend app listening on port ${port}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.response
    ? err.response.data.message
    : err.message
    ? err.message
    : "Internal Server Error";
  console.error("Error in app: Stacktrace: ", err.message);
  res.status(statusCode).json({
    success: false,
    data: errorMessage,
  });
});
