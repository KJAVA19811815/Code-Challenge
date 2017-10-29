const express = require("express");
const io = require("socket.io")();
const mongoose = require("mongoose");
const Message = require("./models/messages");

const data = [
  {
    name: "Roger",
    message: "I am the best tennis player in the world"
  },
  {
    name: "Nadal",
    message: "I am the greatest clay-court player of all time"
  }
];

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

const nsp = io.of("/my-namespace");
nsp.on("connection", function(socket) {
  console.log("someone connected");
});
nsp.emit("hi", "everyone");

const port = 3001;

io.listen(port);
console.log("at 3001");
