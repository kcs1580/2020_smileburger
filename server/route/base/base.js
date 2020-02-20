var express = require("express");
var app = express.Router();
var mysql = require("mysql");
const mybatisMapper = require("mybatis-mapper");


///////////////////////////DB Config////////////////////////////////
const connection = mysql.createConnection({
  host: "ssafy-kiosk-db.cpwfrvk3u3vz.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "adminadmin1234",
  database: "kiosk"
});
mybatisMapper.createMapper(["./sql/base/base.xml"]);
////////////////////////////////////////////////////////////////////

<<<<<<< HEAD
app.get("/async", async function(req, res) {});
app.get("/", function(req, res) {
  res.send("Hello Vote On~");
});
app.get("/test/", function(req, res) {
=======
//////////////////////////admin_order_list select  s
app.get("/adminOrderList", async (req, res) => {
  const params = {};
  const format = {
    language: "sql",
    indent: "  "
  };
  const query = mybatisMapper.getStatement("BASE", "adminOrderList", params, format);
  try {
    await connection.query(query, (error, results) => {
      if (error) {
        console.error(error + "\n adminOrderList 를 get하는데 오류");
        res.send(error);
      } else {
        console.error(results);
        console.log("값 잘 보내지나");
        res.send(results);
      }
    });
  } catch (connectionErr) {
    console.error(connectionErr);
    res.send(connectionErr);
  }
});
/////////////////////////////////e


app.get("/", async function (req, res) { });

app.get("/test/", function (req, res) {
>>>>>>> 8f504a823cc437598ae02a72defa3ac8e8b2f429
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
    connection.query(query, function (error, results, fields) {
      if (error) {
        console.log(error);
      }
      console.log(results);
    });
  });
  connection.end();
  //res.send(req.query); res.json(req.query);  해당 값 다시 해당 페이지로 보내보기
});
app.post("/", function (req, res) {
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.put("/", function (req, res) {
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.delete("/", function (req, res) {
  res.json({ success: "delete call succeed!", url: req.url });
});

app.get("/getOrder", function (req, res) {
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

  connection.query(query, function (error, results, fields) {
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

// 최근에 저장한 주문 정보 불러오기
app.get("/getLatestOrder", async (req, res) => {
  const params = {};
  const format = {
    language: "sql",
    indent: "  "
  };
  const query = mybatisMapper.getStatement("BASE", "getLatestOrder", params, format);
  try {
    await connection.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.send(error);
      } else {
        console.error(results);
        res.send(results);
      }
    });
  } catch (connectionErr) {
    console.error(connectionErr);
    res.send(connectionErr);
  }
});

// 주문이 DB에 저장되는 부분
app.get("/insertOrder", async (req, res) => {
  const waitingNum = req.query.waitingNum;
  const faceID = req.query.faceID;
  const data = req.query.data;
  const type = req.query.type;
  console.log("================================================");
  console.log(typeof waitingNum);
  console.log(waitingNum);
  console.log("================================================");
  const selectParams = {
    owaitingNum: waitingNum,
    faceid: faceID,
    ocontent: data,
    otype: type
  };
  const format = {
    language: "sql",
    indent: "  "
  };
  const query = mybatisMapper.getStatement("BASE", "insertOrder", selectParams, format);
  try {
    await connection.query(query);
  } catch (e) {
    console.log(e);
  }
  res.json({ msg: "성공!!" });
});

// 제품 정보 조회하기
app.get("/getProducts", (req, res) => {
  const params = {
    pcategory: req.query.pcategory
  };
  const format = {
    language: "sql",
    indent: "  "
  };
  const query = mybatisMapper.getStatement("BASE", "getProducts", params, format);
  connection.query(query, function (error, results) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      res.send(results);
      console.log("제품정보 가져오기 완료!!");
    }
  });
});

app.get("/getLastOrderLists", (req, res) => {
  console.log("아이디 받아오니?" + req.query.faceid);
  const params = {
    faceid: req.query.faceid
  };
  const format = {
    language: "sql",
    indent: "  "
  };
  const query = mybatisMapper.getStatement("BASE", "getLastOrderLists", params, format);
  connection.query(query, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      console.log(results);
      res.send(results);
    }
  });
});

app.get("/getpreNumbers", (req, res) => {
  const params = {};
  const format = {
    language: "sql",
    indent: "  "
  };
  const query = mybatisMapper.getStatement("BASE", "getpreNumbers", params, format);
  connection.query(query, (error, results) => {
    if (error) {
      res.send(error);
      // console.log(error);
    } else {
      res.send(results);
      // console.log(results);
    }
  });
});

app.get("/getredNumbers", (req, res) => {
  const params = {};
  const format = {
    language: "sql",
    indent: "  "
  };
  const query = mybatisMapper.getStatement("BASE", "getredNumbers", params, format);
  connection.query(query, (error, results) => {
    if (error) {
      res.send(error);
      // console.log(error);
    } else {
      res.send(results);
      // console.log(results);
    }
  });
});

app.get("/getinOrders", (req, res) => {
  const params = {};
  const format = {
    language: "sql",
    indent: "  "
  };
  const query = mybatisMapper.getStatement("BASE", "getinOrders", params, format);
  connection.query(query, (error, results) => {
    if (error) {
      res.send(error);
      // console.log(error);
    } else {
      res.send(results);
      // console.log(results);
    }
  });
});

app.get("/ready2complete", (req, res) => {
  const params = {
    oid: req.query.oid
  };
  console.log(params.oid);

  const format = {
    language: "sql",
    indent: "  "
  };
  const query = mybatisMapper.getStatement("BASE", "ready2complete", params, format);
  connection.query(query, (error, results) => {
    if (error) {
      res.send(error);
      // console.log(error);
    } else {
      res.send(results);
      // console.log(results)
    }
  });
});

app.get("/complete2out", (req, res) => {
  const params = {
    oid: req.query.oid
  };
  // console.log(params.oid)

  const format = {
    language: "sql",
    indent: "  "
  };
  const query = mybatisMapper.getStatement("BASE", "complete2out", params, format);
  connection.query(query, (error, results) => {
    if (error) {
      res.send(error);
      // console.log(error);
    } else {
      res.send(results);
      // console.log(results)
    }
  });
});

module.exports = app;
