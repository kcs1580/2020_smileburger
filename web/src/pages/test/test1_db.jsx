import React, { useState } from "react";
import Layout from "../../layout/Layout";
import burger from "../../img/burger.jpg";
import chicken from "../../img/chicken.jpg";
import coke from "../../img/coke.jpg";
import set from "../../img/set.jpg";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import Button from "@material-ui/core/Button";
const defaultData = [
  { key: "4", src: set, name: "세트묵자", price: "20000", qty: 0 },
  { key: "1", src: burger, name: "햄버거임", price: "6000", qty: 0 },
  { key: "2", src: chicken, name: "치킨임", price: "17000", qty: 0 },
  { key: "3", src: coke, name: "콜라임", price: "2500", qty: 0 }
];
const TestPageForDB = props => {
  var [lists, setLists] = useState([]);
  const index = 0;

  const addProduct = p => {
    lists = lists.concat(p);
    setLists(lists);
    console.log(lists);
  };
  const orderComplete = () => {
    console.log("주문 완료!");
    axios
      .get("http://localhost:3001/base/test/", {
        params: {
          data: lists
        }
      })
      .then(res => {
        console.log("왔다");
        console.log(res);
        // const { data } = res;ss
        // const temp = props.li.concat(data);
        // props.fn(temp);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <Layout>
      <div>
        DB Test page
        <br></br>
        등록페이지...
        {/* 메뉴들에 대한 정보 defaultData 배열 이미지와 함께 보여주기 */}
        <Table>
          <TableHead>rr</TableHead>
          <TableBody>
            {defaultData.map(p => {
              return (
                <TableCell>
                  <TableRow>
                    <img
                      src={p.src}
                      alt="menu"
                      style={{ height: 250 }}
                      onClick={() => addProduct(p)}
                    />
                  </TableRow>
                  <TableRow>
                    <div>{p.name}</div>
                  </TableRow>
                </TableCell>
              );
            })}
          </TableBody>
        </Table>
        <div style={{}}>
          <Table style={{ width: "400px" }}>
            <TableHead>
              <TableRow>
                <TableCell>이름</TableCell>
                <TableCell>가격</TableCell>
                <TableCell>수량</TableCell>
                <Button color="secondary" variant="contained" onClick={() => orderComplete()}>
                  주문 완료
                </Button>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* 클릭 이벤트 발생시 해당 메뉴 표에 추가하기 */}
              {lists.map(({ key, name, price, qty }) => {
                return (
                  <TableRow key={key}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{price}</TableCell>
                    <TableCell>{qty}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default TestPageForDB;
