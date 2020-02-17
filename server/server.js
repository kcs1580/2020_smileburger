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
const axios = require("axios")
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

io.on("connection", function (socket) {
  console.log(socket.id + "a user connected");

  var instanceid = socket.id;

  socket.on("joinRoom", function (data) {
    console.log(instanceid + " : 접속");
    socket.join(data.roomName);
    roomName = data.roomName;
    io.sockets.in(roomName).emit("recMsg", { orderNum: data.orderNum, isReady: data.isReady });
  });

  socket.on("reqMsg", function (data) {
    console.log(data);
    io.sockets.in(roomName).emit("recMsg", { orderNum: data.orderNum, isReady: data.isReady });
  });

  socket.on("Front2Back", function (data) {
    // console.log(data);
    // console.log(data.contents)
    // 준비중 준비완료 가져오기
    axios.get("http://localhost:3001/getinOrders")
      .then((res) => {
        console.log(res.data)
        const orderList = []
        for (var i in res.data) {
          orderList.push(dataProcess(res.data[i]))
        }
        console.log(orderList)

        io.sockets.in("myroom").emit("Back2Front", orderList)
      })
      .catch((err) => {
        console.log(err)
      })

    // io.sockets.in(roomName).emit("recMsg", { orderNum: data.orderNum, isReady: data.isReady });
  });

});
app.get("/", function (req, res) {
  res.send("Hello Vote On~");
});
// Data Processing
const dataProcess = (data) => {
  var tempmenu
  var menu
  var cnt
  var price
  var contents = []
  for (var i = 0; i < data.ocontent.length; i++) {
    if (data.ocontent[i] == '}') {
      var obj = {
        menu: menu,
        cnt: Number(cnt),
        price: Number(price)
      }
      contents.push(obj)
    }

    if (data.ocontent.slice(i, i + 8) === "contents") {
      tempmenu = []
      var s = i + 11
      var e = s
      while (data.ocontent[e] != ']') {
        e++;
      }
      temp = data.ocontent.slice(s, e).split(',')
      for (var j = 0; j < temp.length; j++) {
        tempmenu.push(temp[j].slice(1, temp[j].length - 1))
      }
      menu = tempmenu.join(', ')
      console.log(menu)

    } else if (data.ocontent.slice(i, i + 3) === "cnt") {
      s = i + 5
      var e = i
      while (data.ocontent[e] != ',') {
        e++
      }
      cnt = data.ocontent.slice(s, e)

    } else if (data.ocontent.slice(i, i + 5) === "price") {
      var s = i + 7
      var e = s
      while (data.ocontent[e] != '}') {
        e++
      }
      price = data.ocontent.slice(s, e)
    }
  }
  // console.log(contents)
  // console.log(data)
  return ({
    oid: data.oid,
    orderNum: data.owaitingNum,
    contents: contents,
    isready: data.isready
  })
}

module.exports = app;