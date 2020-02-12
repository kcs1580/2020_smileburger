import React, { useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import socketio from "socket.io-client";

// let num = 1;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: "20px"
  },
  paper: {
    padding: theme.spacing(9),
    textAlign: "center",
    color: "white",
    borderBottom: "solid",
    background: "black"
  }
}));
const socket = socketio.connect("http://localhost:3001");

(() => {
  socket.emit("joinRoom", { roomName: "myroom" });
  console.log("hi");
})();

const Waiting = () => {
  const classes = useStyles();
  const [li, setLi] = useState([]);
  const [num, setNum] = useState(0);
  // const list = li.map(nu2 => <div>{nu2}</div>)
  // ---------------

  // useEffect(() => {   const list = li.map(nu2 => <div>{nu2}</div>)}, [li])
  // ----------------
  // const list = li.map(nu2 => {   return <div>{nu2}</div>; });

  socket.on("recMsg", data => {
    const oid = data.map(burgeridx => {
      return burgeridx.oid;
    });
    console.log(data);
    // console.log(data.isReady);
    setLi(li.concat(oid));
  });

  const getList = () =>
    li.map(nu2 => {
      return (
        <Grid item xs={4}>
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

export default Waiting;
