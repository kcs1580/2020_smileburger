const envJson = require(`${__dirname}/env/env.json`);
const port = process.env.PORT ? envJson.port : 3001;

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require(`${__dirname}/middleware/init`));
app.use(require(`${__dirname}/middleware/db`));

app.use("/base", require(`${__dirname}/route/base/base`));

app.get("/", function(req, res) {
  res.send("Hello Vote On~");
});

app.listen(port, () => {
  console.log(`Backend start ${port}!`);
});
