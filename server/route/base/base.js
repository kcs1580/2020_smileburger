var express = require("express");
var app = express.Router();
var mysql = require("mysql");
const mybatisMapper = require("mybatis-mapper");

let orderNum = 0;

///////////////////////////DB Config////////////////////////////////
const connection = mysql.createConnection({
  host: "ssafy-kiosk-db.cpwfrvk3u3vz.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "adminadmin1234",
  database: "kiosk"
});
mybatisMapper.createMapper(["./sql/base/base.xml"]);
////////////////////////////////////////////////////////////////////

app.get("/", async function(req, res) {});

app.get("/test/", function(req, res) {
  var data = req.query.data;
  const jsondata = [];
  data.map(item => {
    jsondata.push(JSON.parse(item));
  });

  connection.connect();
  jsondata.map(item => {
    var selectParams = {
      pid: null,
      pname: item.name,
      pprice: item.price,
      pqty: item.qty
    };
    //Send Queries
    var format = {
      language: "sql",
      indent: "  "
    };
    var query = mybatisMapper.getStatement("BASE", "insertTest", selectParams, format);
    connection.query(query, function(error, results, fields) {
      if (error) {
        console.log(error);
      }
      console.log(results);
    });
  });
  connection.end();
  //res.send(req.query); res.json(req.query);  해당 값 다시 해당 페이지로 보내보기
});
app.post("/", function(req, res) {
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.put("/", function(req, res) {
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.delete("/", function(req, res) {
  res.json({ success: "delete call succeed!", url: req.url });
});

app.get("/getOrder", function(req, res) {
  console.log("들어옴");
  //connection.connect(); 조회할 파라미터
  var param = {
    oid: req.body.oid,
    ouser: req.body.ouser,
    ostore: req.body.ostore,
    odate: req.body.odate,
    oproducts: req.body.oproducts,
    ototal: req.body.ototal,
    otype: req.body.otype,
    description: req.body.description
  };

  // 쿼리문 형식
  let format = {
    language: "sql",
    indent: "  "
  };
  //첫번째는 xml의 namespace, 두번째는 해당 xml id값, 세번째는 파라미터, 마지막은 포맷.
  let query = mybatisMapper.getStatement("BASE", "getOrder", param, format);
  console.log(query); // 쿼리 출력

  connection.query(query, function(error, results, fields) {
    if (error) {
      console.log(error);
    }
    console.log(results);
  });

  // connection.execute(query, [], function(err, result) {   if (err) {
  // console.error(err.message);     doRelease(connection);     return;   }
  // console.log(result.rows);  데이터   doRelease(res, connection, result.rows);
  // Connection 해제 }); connection.end();
  res.json({ success: query + " load succeed!", url: req.url });
});

// SD back test =================================
app.get("/orderTest", (req, res) => {
  let data = req.query.data;
  let where = req.query.where;
  const jsonData = [];
  data.map(item => {
    jsonData.push(JSON.parse(item));
  });

  // BackEnd에 잘 전달됐는지 확인
  res.json({
    msg: "succeed",
    data: jsonData,
    where: where
  });

  connection.connect();
  jsondata.map(item => {
    var selectParams = {
      pid: null, // 여기 수정중
      pname: item.name,
      pprice: item.price,
      pqty: item.qty
    };
  });
  connection.end();
});

module.exports = app;
