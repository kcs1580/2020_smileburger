var express = require("express");
var app = express.Router();
var mysql = require("mysql");
const mybatisMapper = require("mybatis-mapper");

///////////////////////////DB Config////////////////////////////////
const connection = mysql.createConnection({
  host: "ssafy-kiosk-db.cpwfrvk3u3vz.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "adminadmin1234",
  database: "tmpDB"
});
mybatisMapper.createMapper(["./sql/base/base.xml"]);
////////////////////////////////////////////////////////////////////

app.get("/", async function(req, res) {
  res.redirect("https://www.google.com");
});

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
    var format = { language: "sql", indent: "  " };
    var query = mybatisMapper.getStatement("BASE", "insertTest", selectParams, format);
    connection.query(query, function(error, results, fields) {
      if (error) {
        console.log(error);
      }
      console.log(results);
    });
  });
  connection.end();
  //res.send(req.query);
  //res.json(req.query); // 해당 값 다시 해당 페이지로 보내보기
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

module.exports = app;
