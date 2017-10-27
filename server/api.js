const openSocket = require("socket.io-client");
const socket = openSocket("http://localhost:3000/");

module.exports = {
  task: function() {
    socket.on("message", msg => {
      console.log("incoming message", msg);
    });
  }
};
