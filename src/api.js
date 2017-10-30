import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3001/");

function messages(cb) {
  socket.on("timer", data => cb(null, data));
  socket.emit("messages");
}

export { messages };
