// const mysql = require("mysql");
const mybatisMapper = require("mybatis-mapper");

const envJson = require(`${__dirname}/env/env.json`);
const port = process.env.PORT ? envJson.port : 3001;
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const base = require("./route/base/base");
//mybatisMapper.createMapper(["./base/base.xml"]);

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

const server = http.createServer(app);
const io = require("socket.io")(server, { path: "/socket.io" });

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require(`${__dirname}/middleware/init`));
app.use(require(`${__dirname}/middleware/db`));

app.use("/base", require(`${__dirname}/route/base/base`));

const serverHandler = (req, res) => {
  console.log("socket server connected");
};
server.listen("3001", serverHandler);

io.on("connection", function(socket) {
  console.log(socket.id + "a user connected");

  var instanceid = socket.id;

  socket.on("joinRoom", function(data) {
    console.log(instanceid + " : 접속");
    socket.join(data.roomName);
    roomName = data.roomName;
  });

  socket.on("reqMsg", function(data) {
    console.log(data);
    io.sockets.in(roomName).emit("recMsg", { orderNum: data.orderNum, isReady: data.isReady });
  });
});

app.get("/", function(req, res) {
  res.send("Hello Vote On~");
});

module.exports = app;
