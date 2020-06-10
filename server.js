const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
let database = null;
require("dotenv/config");

const app = express();

app.listen(process.env.PORT);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const client = new MongoClient(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err, result) => {
  if (err) return console.log(err);
  database = result.db("acbData");
  require("./allRoutes")(app, database);
  console.log("success live on port " + process.env.PORT);
});
