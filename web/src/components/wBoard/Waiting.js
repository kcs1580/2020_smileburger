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
    padding: theme.spacing(8),
    textAlign: "center",
    color: "white",
    background: "#232020",
    borderBottom: "solid"
  }
}));
// const socket = socketio.connect("http://i02c103.p.ssafy.io:3001");
const socket = socketio.connect("http://13.124.177.255:3001");
(() => {
  socket.emit("joinRoom", { roomName: "myroom" });
  console.log("joingroom waiting");
})();
const Waiting = () => {
  const classes = useStyles();
  const [li, setLi] = useState([]);
  // const list = li.map(nu2 => <div>{nu2}</div>)
  // ---------------
  // useEffect(() => {   const list = li.map(nu2 => <div>{nu2}</div>)}, [li])
  // ----------------
  // const list = li.map(nu2 => {   return <div>{nu2}</div>; });
  socket.on("recMsg", data => {
    console.log("메세지 받았따");
    // Axios.get("http://i02c103.p.ssafy.io:3001/getpreNumbers")
    Axios.get("http://13.124.177.255:3001/getpreNumbers")
      .then(res => {
        console.log(res.data);
        const li2 = [];
        const test = res.data.map(id => {
          console.log(id.owaitingNum);
          li2.push(id.owaitingNum);
          //setLi(li.concat(id.oid))
        });
        setLi(li2);
        // setLi(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  });
  const GetList = () =>
    li.map((nu2, idx) => {
      return (
        <Grid item xs={4} key={idx}>
          <Paper className={classes.paper}>
            <span className={classes.papercontent} style={{ fontSize: "80px" }}>
              {nu2}
            </span>
          </Paper>
        </Grid>
      );
    });
  // socket.emit();
  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <GetList />
      </Grid>
    </div>
  );
};
export default Waiting;