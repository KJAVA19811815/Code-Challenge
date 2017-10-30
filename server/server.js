const express = require("express");
const io = require("socket.io")();
const mongo = require("mongodb").MongoClient;

mongo.connect("mongodb://127.0.0.1/mongochat", function(err, db) {
  if (err) {
    throw err;
  } else {
    console.log("MONGO CONNECTED");
  }

  io.on("connection", socket => {
    let chat = db.collection("chats");

    sendStatus = function(s) {
      socket.emit("status", s);
    };

    chat
      .find()
      .limit(20)
      .sort({ _id: 1 })
      .toArray(function(err, res) {
        if (err) {
          throw err;
        } else {
          socket.on("messages", function() {
            console.log("sending the messages");
            socket.emit("timer", res);
          });
        }
      });
    socket.on("emit", function(data) {
      const text = JSON.parse(data);
      let name = text.name;
      let message = text.message;

      if (name == "" || message == "") {
        sendStatus("plz enter name and message");
      } else {
        chat.insert({ name: name, message: message }, function() {
          socket.emit("timer", [data]);
          console.log("IT IS INSERTED");

          sendStatus("message sent");
        });
      }
      // const text = JSON.parse(msg);
      // console.log("TEXT", text);
      // data.push(text);
    });
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
