const express = require("express");
const io = require("socket.io")();
const mongoose = require("mongoose");
const Message = require("./models/messages");

// mongoose.connect("mongodb://localhost/react", () => {
//   console.log("connected");
// });

const data = [];

io.on("connection", socket => {
  socket.on("messages", function() {
    console.log("sending the messages");
    socket.emit("timer", data);
  });
  socket.on("emit", function(msg) {
    const text = JSON.parse(msg);
    console.log("TEXT", text);
    data.push(text);
  });
});

const port = 3001;

io.listen(port);
console.log("at 3001");
