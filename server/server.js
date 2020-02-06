const envJson = require(`${__dirname}/env/env.json`);
const port = process.env.PORT ? envJson.port : 3001;
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
var corsOptions = {
  //origin: "*",
  origin: true, // 추가된내용
  credentials: true, // 추가된내용
  optionsSuccessStatus: 200
};
const server = http.createServer(app);
const io = require("socket.io")(server, { path: '/socket.io' })
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require(`${__dirname}/middleware/init`));
app.use(require(`${__dirname}/middleware/db`));
app.use("/base", require(`${__dirname}/route/base/base`));
const serverHandler = (req, res) => {
  console.log('socket server connected');
}
server.listen('3001', serverHandler);
io.on("connection", function (socket) {
  console.log(socket.id + "a user connected");

  var instanceid = socket.id;
  socket.on("joinRoom", function (data) {
    console.log(instanceid + " : 접속");
    socket.join(data.roomName);
    roomName = data.roomName;
  });
  socket.on('reqMsg', function (data) {
    console.log(data);
    io.sockets.in(roomName).emit('recMsg', { orderNum: data.orderNum, isReady: data.isReady });
  })
});
app.get("/", function (req, res) {
  res.send("Hello Vote On~");
});
// -----------------------------------------------------------------------------------
// 임시 데이터
// app.get("/test/", function(req, res) {
//   res.json([
//     {
//       id: 1,
//       title: "싸이버거",
//       img: "http://www.momstouch.co.kr/data/shopimages/xboard/menu/20170726381288.jpg(54 kB)
// http://www.momstouch.co.kr/data/shopimages/xboard/menu/20170726381288.jpg
// ",
//       price_single: 3400,
//       price_set: 5600,
//       cooking_time: "7~10",
//       description:
//         "매콤한 통다리살 패티를 신선한 양상추, 양파와 함께 즐길 수 있는 맘스터치 대표 버거"
//     },
//     {
//       id: 2,
//       title: "불싸이버거",
//       img: "http://www.momstouch.co.kr/data/shopimages/xboard/menu/20170412442355.jpg(58 kB)
// http://www.momstouch.co.kr/data/shopimages/xboard/menu/20170412442355.jpg
// ",
//       price_single: 3600,
//       price_set: 5800,
//       cooking_time: "7~10",
//       description:
//         "매콤한 통다리살 패티를 신선한 양상추, 양파와 함께 즐길 수 있는 맘스터치 대표 버거인 싸이버거에 매콤함을 추가한 버거"
//     }
//   ]);
// });
// -----------------------------------------------------------------------------------
// app.listen(port, () => {
//   console.log(`Backend start ${port}!`);
// });
module.exports = app;