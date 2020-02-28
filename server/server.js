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
const axios = require("axios");
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

app.use("/", require(`${__dirname}/route/base/base`));

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
    io.sockets.in(roomName).emit("recMsg", { orderNum: data.orderNum, isReady: data.isReady });
    console.log("joinroom");
  });

  socket.on("reqMsg", function(data) {
    io.sockets.in("myroom").emit("recMsg", data);
    console.log("통신중");
    // console.log(data);
    // axios
    //   .get("http://localhost:3001/getinOrders")
    //   .then(res => {
    //     io.sockets.in("myroom").emit("recMsg", res.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  });

  socket.on("Front2Back", function(data) {
    // console.log(data);
    // console.log(data.contents)
    // 준비중 준비완료 가져오기
    // io.sockets.in(roomName).emit("recMsg", { orderNum: data.orderNum, isReady: data.isReady });
  });
});

module.exports = app;
