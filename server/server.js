const express = require("express");
const io = require("socket.io")();
const mongo = require("mongodb").MongoClient;

//CONNECTING TO MONGODB
mongo.connect("mongodb://127.0.0.1/mongochat", function(err, db) {
  if (err) {
    throw err;
  } else {
    console.log("MONGO CONNECTED");
  }

  //CONNECTING TO CLIENT
  io.on("connection", socket => {
    let chat = db.collection("chats");
    // CREATING THE CONNECTION

    //HELPER FUNCTION
    sendStatus = function(s) {
      socket.emit("status", s);
    };

    //GET THE MESSAGES WHICH ARE TO BE SENT TO THE CLIENT
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
            // EMIT THE MESSAGES TO THE CLIENT
            socket.emit("timer", res);
          });
        }
      });
    socket.on("emit", function(data) {
      //GETTING THE DATA FROM THE CLIENT
      const text = JSON.parse(data); //PARSING THE DATA USING PARSE
      let name = text.name;
      let message = text.message;

      if (name == "" || message == "") {
        sendStatus("plz enter name and message");
      } else {
        //INSERTING THE MESSAGE INTO THE COLLECTION
        chat.insert({ name: name, message: message }, function() {
          socket.emit("timer", [data]);
          console.log("IT IS INSERTED");

          sendStatus("message sent");
        });
      }
    });
  });
});

const port = 3001;

io.listen(port);
console.log("at 3001");
