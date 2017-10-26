const express = require("express");
const io = require("socket.io")();

const data = [
  {
    name: "Karun",
    message: "Hello"
  }
];

io.on("connection", client => {
  client.on("subscribeToTimer", interval => {
    console.log("client is subscribing to tmier with interval", interval);
    setInterval(() => {
      client.emit("timer", Date.now());
    }, interval);
  });
});

const port = 3001;

io.listen(port);
console.log("at 3001");
