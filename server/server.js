const express = require("express");
const io = require("socket.io")();

const arr = ["Roger", "Rafa", "Andy", "Novak"];

function random() {
  return arr[Math.floor(Math.random() * arr.length)];
}

const data = [
  {
    id: 1,
    name: random(),
    message: "I am the best in the world"
  },
  {
    id: 2,
    name: random(),
    message: "I won the most french opens"
  },
  {
    id: 3,
    name: random(),
    message: "I won the most australian opens"
  },
  {
    id: 4,
    name: random(),
    message: "I am stuck at three"
  }
];

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
