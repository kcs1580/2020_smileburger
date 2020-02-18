import React, { useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import socketio from "socket.io-client";
import Axios from "axios";

// let num = 1;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: "20px"
  },
  paper: {
    padding: theme.spacing(9),
    textAlign: "center",
    color: "yellow",
    borderBottom: "solid",

    background: "black"
  }
}));

const socket = socketio.connect("http://i02c103.p.ssafy.io:3001");

(() => {
  socket.emit("joinRoom", { roomName: "myroom" });
  console.log("hi");
})();

const Done = () => {
  const classes = useStyles();

  const [li, setLi] = useState([]);
  const [num, setNum] = useState(0);
  // const list = li.map(nu2 => <div>{nu2}</div>)
  // ---------------

  // useEffect(() => {   const list = li.map(nu2 => <div>{nu2}</div>)}, [li])
  // ----------------
  // const list = li.map(nu2 => {   return <div>{nu2}</div>; });

  socket.on("recMsg", data => {
    console.log("메세지 받았따")
    Axios.get("http://localhost:3001/getredNumbers")
      .then((res) => {
        console.log(res.data)
        const li2 = []
        const test = res.data.map((id) => {
          console.log(id.oid)
          li2.push(id.oid)
          //setLi(li.concat(id.oid))
        })
        setLi(li2)
        // setLi(res.data);

      })
      .catch((err) => {
        console.log(err)
      });


  });


  const getList = () =>
    li.map(nu2 => {
      return (
        <Grid item xs={6}>
          <Paper className={classes.paper}>{nu2}</Paper>
        </Grid>
      );
    });

  const list = useMemo(() => getList(), [li]);
  socket.emit();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {list}
      </Grid>
    </div>
  );
};
export default Done;
