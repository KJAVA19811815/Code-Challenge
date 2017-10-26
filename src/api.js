import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3001/");

// function subscribeToTimer(cb) {
//   socket.on("timer", timestamp => cb(null, timestamp));
//   socket.emit("subscribeToTimer", 1000);
// }
// export { subscribeToTimer };

function messages(cb) {
  socket.on("timer", data => cb(null, data));
  socket.emit("messages");
}

export { messages };
