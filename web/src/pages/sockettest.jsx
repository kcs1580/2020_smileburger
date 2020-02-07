import React, { useState } from "react";
import socketio from "socket.io-client";

// let num = 1;

const socket = socketio.connect("http://13.124.177.255:3001");
(() => {
  console.log("hi");
  socket.emit("joinRoom", { roomName: "myroom" });
  socket.on();
})();

const Sockettest = () => {
  const [num, setNum] = useState(0);

  const handle = e => {
    setNum(e.target.value);
  };

  const send = text => {
    socket.emit("reqMsg", { orderNum: text, isReady: false });
  };

  return (
    <div>
      <input
        type="text"
        onChange={e => {
          handle(e);
        }}
      />

      <button
        onClick={() => {
          send(num);
        }}
      >
        {" "}
        보내기{" "}
      </button>
      <div>{num}</div>

      <br />
>>>>>>> feature/manager
    </div>
  );
};

export default Sockettest;