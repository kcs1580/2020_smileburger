import React, { useState, useMemo } from "react";

import socketio from "socket.io-client";

// let num = 1;

const socket = socketio.connect("http://localhost:3001");

(() => {
  socket.emit("joinRoom", { roomName: "myroom" });
  console.log("hi");
})();

const Waiting = () => {
  const [li, setLi] = useState([]);
  const [num, setNum] = useState(0);
  // const list = li.map(nu2 => <div>{nu2}</div>)
  // ---------------

  // useEffect(() => {   const list = li.map(nu2 => <div>{nu2}</div>)}, [li])
  // ----------------
  // const list = li.map(nu2 => {   return <div>{nu2}</div>; });

  socket.on("recMsg", data => {
    const oid = data.map(burgeridx => {
      return burgeridx.oid
    })
    console.log(data);
    // console.log(data.isReady);
    setLi(li.concat(oid));
  });

  const getList = () =>
    li.map(nu2 => {
      return <div>{nu2}</div>;
    });

  const list = useMemo(() => getList(), [li]);
  socket.emit();

  return (
    <div>
      {/*<div>{num}</div>*/}
      <div>{list}</div>
      <br />
    </div>
  );
};

export default Waiting;
