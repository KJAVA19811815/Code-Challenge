const express = require("express");
const io = require("socket.io")();

const arr = ["Roger", "Rafa", "Andy", "Novak"];

function random() {
  return arr[Math.floor(Math.random() * arr.length)];
}

const data = [];

// var id = 0;
// var nextId = id++

// io.on("connection", client => {
//   client.on("subscribeToTimer", interval => {
//     console.log("client is subscribing to timer with interval ", interval);
//     setInterval(() => {
//       client.emit("timer", new Date());
//     }, interval);
//   });
// });

io.on("connection", socket => {
  socket.on("messages", function() {
    console.log("sending the messages");
    socket.emit("timer", data);
  });
  socket.on("emit", function(msg) {
    const text = JSON.parse(msg);
    console.log("TEXT", text);
    data.push(text);
    console.log(data);
  });
});

const port = 3001;

io.listen(port);
console.log("at 3001");
