const express = require("express");
const io = require("socket.io")();

const data = [
  {
    name: "Karun",
    message: "Hello"
  }
];

// io.on("connection", client => {
//   client.on("subscribeToTimer", interval => {
//     console.log("client is subscribing to tmier with interval", interval);
//     setInterval(() => {
//       client.emit("timer", Date.now());
//     }, interval);
//   });
// });

io.on("connection", client => {
  client.on("messages", function() {
    console.log("sending the messages");
    client.emit("timer", data);
    console.log(data);
  });
});

const port = 3001;

io.listen(port);
console.log("at 3001");
